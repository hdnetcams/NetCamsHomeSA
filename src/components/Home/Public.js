/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";

import Card from "./Card";
import CatFilter from "./CatFilter";
import Data from "../../data3.json";
import Test from "./Test";
import classes from "./Public.module.css";



const Public = (props) => {
  useEffect(()  => {
    document.body.classList.add('noScroll');

    return () => {
        document.body.classList.remove('noScroll');
    };
});
  const json = Data;
  const cameras = json.categories;

  return (
    <div className={classes.modal}>
      <div className={classes.backdrop} />
      {/* <button>Close</button> */}
      {/* <Card json={Data} Full  /> */}
      <Test  />
      {/* Uncomment Test and comment Card. Test will be in front of backdrop, Card is behind? */}
    </div>
  );
};
export default Public;
