/* eslint-disable */
// https://reactjs.org/docs/lists-and-keys.html
// https://sdever.medium.com/building-a-responsive-navigation-bar-with-react-css-d9b30af03c20
import React, { useState } from "react";
import classes from "./CatFilter.module.css";

function catItemHelper(qty) {
  return qty == 0 ? classes.itemDisable : classes.item;
}

const CatFilter = (props) => {
  const json = props.json;
  const category = json.categories.map((category) => (
    <li className={catItemHelper(category.cameras.length)}>
      {category.name}
      {/* <span className={classes.catCount}>{category.cameras.length}</span> */}
    </li>
  ));

  return (
    <div>
      <ul className={classes.menu}>
        <li className={classes.item}>All</li>
        <li className={classes.item}>Featured</li>
        {category}
        <li className={classes.toggle}>
          {/* <i className={classes.fas fa-bars}></i> */}
        </li>
      </ul>
    </div>
  );
};

export default CatFilter;
const items = document.querySelectorAll(".item");

/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}

/* Event Listeners */
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
    item.addEventListener("keypress", toggleItem, false);
  }
}
