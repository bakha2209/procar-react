import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectDealerPage = (state: AppRootState) => state.dealerPage
export const retrieveTargetDealers = createSelector(
    selectDealerPage,
    (DealerPage) => DealerPage.targetDealers
);
export const retrieveChosenDealer = createSelector(
    selectDealerPage,
    (DealerPage) => DealerPage.chosenDealer
);
export const retrieveTargetCars = createSelector(
    selectDealerPage,
    (DealerPage) => DealerPage.targetCars
);
export const retrieveChosenCar = createSelector(
    selectDealerPage,
    (DealerPage) => DealerPage.chosenCar
);