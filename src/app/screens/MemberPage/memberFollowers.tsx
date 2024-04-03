import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveMemberFollowers
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
  setMemberFollowers
} from "./slice";
import { BoArticle } from "../../../types/boArticle";
import { Follower } from "../../../types/follow";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) =>
    dispach(setMemberFollowers(data)),
});

// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

const followers = [
  { mb_nick: "botir", following: true },
  { mb_nick: "jonibek", following: false },
  { mb_nick: "larisa", following: true },
];

export function MemberFollowers(props: any) {
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  return (
    <Stack>
      {followers.map((follower) => {
        const image_url = "/icons/default_img.svg";
        return (
          <Box className={"follow_box"}>
            <Avatar src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">USER</span>
              <span className="name_text">{follower.mb_nick}</span>
            </div>
            {props.actions_enabled &&
              (follower.following ? (
                <Button
                  variant="contained"
                  className="following_already"
                  disabled
                >
                  FOLLOWING
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={
                    <img src="/icons/user.svg" style={{ width: "40px" }} />
                  }
                  className="follow_btn"
                >
                  Follow back
                </Button>
              ))}
          </Box>
        );
      })}
    </Stack>
  );
}