import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { ByCategories } from "./byCategories";
import { TopBrands } from "./topBrands";
import { BestDealers } from "./bestDealers";
import { Events } from "./events";
import { Advertisements } from "./advertisements";
import { Statistics } from "./statistics";
import { Articles } from "./article";
import "../../../css/homepage.css"

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopBrands } from "./slice";
import { retrieveTopBrands } from "./selector";
import { Car } from "../../../types/car";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTopBrands: (data: Car[]) => dispach(setTopBrands(data)),
});
// REDUX SELECTOR
const topBrandRetriever = createSelector(
  retrieveTopBrands,
  (topBrands) => ({
    topBrands,
  })
);

export function HomePage() {
  //INITIALIZATION
  const { setTopBrands } = actionDispatch(useDispatch());
  const { topBrands } = useSelector(topBrandRetriever);

  useEffect(() => {
    //backend data request => data
    
    setTopBrands([])

    //slice: data => store
  }, []);
  return (
    <div className="homepage">
      <TopBrands />
      <ByCategories />
      <BestDealers />
      <Advertisements />
      <Events />
      <Statistics />
      <Articles />
    </div>
  );
}
