import { Container } from "@mui/material";
import React from "react";
import { ByCategories } from "./byCategories";
import { TopBrands } from "./topBrands";
import { BestDealers } from "./bestDealers";
import { Events } from "./events";
import { Advertisements } from "./advertisements";
import { Statistics } from "./statistics";

export function HomePage() {
  return (
    <div className="homepage">
      <ByCategories />
      <TopBrands />
      <BestDealers />
      <Advertisements />
      <Events />
      <Statistics/>
    </div>
  );
}
