import { createSlice } from "@reduxjs/toolkit";
import { DealerPageState } from "../../../types/screen";

const initialState: DealerPageState = {
  targetDealers: [],
  chosenDealer: null,
  targetCars: [],
  chosenCar: null,
};

const dealerPageSlice = createSlice({
    name: "dealerPage",
    initialState,
    reducers: {
        setTargetDealers: (state, action) => {
            state.targetDealers=action.payload
        },
        setChosenDealer: (state, action) => {
            state.chosenDealer=action.payload
        },
        setTargetCars: (state, action) => {
            state.targetCars=action.payload
        },
        setChosenCar: (state, action) => {
            state.chosenCar=action.payload
        },
    }
})

export const {
    setTargetDealers,
    setChosenDealer,
    setTargetCars,
    setChosenCar
} = dealerPageSlice.actions

const DealerPageReducer = dealerPageSlice.reducer;
export default DealerPageReducer;