import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage
export const retrieveTopBrands = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topBrands
);
export const retrieveByCategories = createSelector(
    selectHomePage,
    (HomePage) => HomePage.byCategories
);
export const retrieveBestDealers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestDealers
);
export const retrieveBestBoArticles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestBoArticles
);
export const retrieveEvents = createSelector(
    selectHomePage,
    (HomePage) => HomePage.events
);
