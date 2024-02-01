import { Container } from "@mui/material";
import React from "react";
import { ByCategories } from "./byCategories";
import { TopBrands } from "./topBrands";
import { BestDealers } from "./bestDealers";
import { Events } from "./events";
import { Advertisements } from "./advertisements";

export function HomePage() {
    return <div className="homepage">
        <ByCategories/>
        <TopBrands/>
        <BestDealers/>
        <Events/>
        <Advertisements/>
    </div>
}