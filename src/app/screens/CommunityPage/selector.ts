import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";
import { CommunityPage } from ".";

const selectCommunityPage = (state: AppRootState) => state.communityPage;
export const retrieveTargetBoArticles = createSelector(
    selectCommunityPage,
    (CommunityPage)=> CommunityPage.targetBoArticles
)