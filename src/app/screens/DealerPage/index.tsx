import { Container } from "@mui/material";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenCar } from "./chosenCar";
import { OneDealer } from "./oneDealer";
import { AllDealers } from "./allDealers";
import "../../../css/dealer.css"
import { AllCars } from "./allCars";

export function DealerPage() {
  let dealer = useRouteMatch();
  return (
    <div className="dealer_page">
      <Switch>
        <Route path={`${dealer.path}/cars/:car_id`}>
          <ChosenCar />
        </Route>
        <Route path={`${dealer.path}/cars`}>
          <AllCars />
        </Route>
        <Route path={`${dealer.path}/:dealer_id`}>
          <OneDealer />
        </Route>
        <Route path={`${dealer.path}`}>
          <AllDealers />
        </Route>
      </Switch>
    </div>
  );
}
