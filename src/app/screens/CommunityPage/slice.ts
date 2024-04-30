import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../../types/screen";

const initialState: CommunityPageState = {
  targetBoArticles: [],
  recentArticles:[],
};

const communityPageSlice = createSlice({
  name: "communityPage",
  initialState,
  reducers: {
    setTargetBoArticles: (state, action) => {
      state.targetBoArticles = action.payload;
    },
    setRecentArticles: (state, action) => {
      state.recentArticles = action.payload;
    },
  },
});

export const {setTargetBoArticles,setRecentArticles} = communityPageSlice.actions
const CommunityPageReducer = communityPageSlice.reducer;
export default CommunityPageReducer;
