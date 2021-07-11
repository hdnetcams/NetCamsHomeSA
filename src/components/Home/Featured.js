/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import Card from "./Card";
import Public from "./Public";
import CatFilter from "./CatFilter";
import Data from "../../data3.json";
import Classes from "./Featured.module.css"

const Featured = (props) => {
  const [showPublic, setShowPublic] = useState(false);
  const publicHandler = () => {
    setShowPublic();
  };
  const publicHideHandler = () => {
    setShowPublic(false);
  };

  const json = Data;
  console.log(json);
  const cameras = json.categories;

  return (
    <div>
      <p className={Classes.title}>Featured Cameras</p>
      <button onClick={publicHandler}>More5</button>
      <CatFilter json={Data} />
      {showPublic ?? <Public json={Data} full={true} />}
      <Card json={Data} full={false} />
      
    </div>
  );
};
export default Featured;
