import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import Tablist from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import { GiShadowFollower } from "react-icons/gi";
import TViewer from "../../components/tuiEditor/TViewer";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveChosenMember,
  retrieveChosenSingleBoArticle,
  retrieveChosenMemberBoArticles,
} from "./selector";
import { createSelector } from "reselect";
import { Member } from "../../../types/user";
import { serverApi } from "../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { useHistory } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { BoArticle } from "../../../types/boArticle";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member) => dispach(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispach(setChosenSingleBoArticle(data)),
});

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenSingleBoArticles) => ({
    chosenSingleBoArticles,
  })
);

const follower = 2;

export function VisitOtherPage(props: any) {
  //INITIALIZIATION
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticles } = useSelector(
    chosenSingleBoArticlesRetriever
  );
  const [value, setValue] = useState("1");

  // HANDLERS
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="my_page">
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className="my_page_left">
              <img src="/home/super_car.jpg" className="profile_img" alt="" />
              <div className="full_name">Mehedil Mohammad</div>
              <span>User</span>
              <Box display={"flex"} justifyContent={"center"}>
                <Tablist
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {false ? (
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={() => (
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#f70909b8" }}
                        >
                          UNFOLLOW
                        </Button>
                      )}
                    />
                  ) : (
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={() => (
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#30945e" }}
                        >
                          FOLLOW
                        </Button>
                      )}
                    />
                  )}
                </Tablist>
              </Box>
              <Box className="my_page_menu">
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  orientation="vertical"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("1")}>
                        <img src="/icons/story_icon.svg" alt="" />
                        <p>Stories</p>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("2")}>
                        <GiShadowFollower
                          color="red"
                          style={{ marginRight: "15px" }}
                        />
                        <p>Followers</p>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <GiShadowFollower
                          color="red"
                          style={{ marginRight: "15px" }}
                        />
                        <p>Followings</p>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
              <Box className="phone_box">
                <img src="/icons/add_call.svg" alt="" />
                <Box
                  flexDirection={"column"}
                  marginLeft={"25px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <div className="phone_div">Phone:</div>
                  <span>+821056817724</span>
                </Box>
              </Box>

              <Box className="social_box">
                <Box
                  flexDirection={"row"}
                  marginBottom={"15px"}
                  alignItems={"center"}
                >
                  <img src="/icons/mail_icon.svg" alt="" />
                  <span>Email Address</span>
                </Box>
                <span style={{ fontSize: "13px" }}>
                  bakhodir2209@gmail.com <br />
                  <br />
                  <span>followers: {follower}</span>
                  <br />
                  <span>followings: {follower}</span>
                </span>
                <Box
                  flexDirection={"row"}
                  marginBottom={"15px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <img src="/icons/add_link.svg" alt="" />
                  <span>Social Link</span>
                </Box>
                <Box flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/youtube_icon.svg" alt="" />
                  <img src="/icons/twitter_icon.svg" alt="" />
                  <img src="/icons/facebook_icon.svg" alt="" />
                  <img src="/icons/insta_icon.svg" alt="" />
                </Box>
              </Box>
            </Stack>
            <Stack className="my_page_right">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">Stories</Box>
                  <Box className="menu_content">
                    <MemberPosts />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      justifyContent={"center"}
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={3}
                          page={1}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color="secondary"
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers actions_enabled={true} />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing actions_enabled={true} />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Chosen Story</Box>
                  <Box className={"menu_content"}>
                    <TViewer />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
