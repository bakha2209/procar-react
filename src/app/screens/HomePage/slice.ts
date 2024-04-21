import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topBrands: [],
  byCategories: [],
  bestDealers: [],
  bestBoArticles: [],
  events:[],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopBrands: (state, action) => {
      state.topBrands = action.payload;
    },
    setByCategories: (state, action) => {
      state.byCategories = action.payload;
    },
    setBestDealers: (state, action) => {
      state.bestDealers = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload
    }
  },
});

export const {
  setTopBrands,
  setByCategories,
  setBestDealers,
  setBestBoArticles,
  setEvents,
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
