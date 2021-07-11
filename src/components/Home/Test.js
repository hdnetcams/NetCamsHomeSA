import classes from "./Public.module.css";
import Card from "./Card";
import Public from "./Public";
import CatFilter from "./CatFilter";
import Data from "../../data3.json";

const Test = (props) => {
  const pStyle = {
    fontSize: "15px",
    textAlign: "center",
    
  };

  return (
    <div className={classes.modal}>
      <p style={pStyle}>I want the Public modal here. <br />
      It should be the same as Featured.js but have no limit on thumbs and be filterable by category (CatFilter.js)
      <button>Close (replace with X)</button>
      <Card json={Data} props Full  />
      </p> 
      
    </div>
  );
};
export default Test;
