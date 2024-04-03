import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveMemberFollowings
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
  setMemberFollowings
} from "./slice";
import { BoArticle } from "../../../types/boArticle";
import { Follower } from "../../../types/follow";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowings: (data: Follower[]) =>
    dispach(setMemberFollowings(data)),
});

// REDUX SELECTOR
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

const followings = [
  { mb_nick: "botir" },
  { mb_nick: "jonibek" },
  { mb_nick: "larisa" },
];

export function MemberFollowing(props: any) {
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  return (
    <Stack>
      {followings.map((follower) => {
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
            {props.actions_enabled &&(
              
              
                <Button
                  variant="contained"
                  startIcon={
                    <img src="/icons/user.svg" style={{ width: "40px", marginLeft: "16px" }} />
                  }
                  className="follow_cancel_btn"
                >
                  Bekor Qilish
                </Button>
              )}
          </Box>
        );
      })}
    </Stack>
  );
}
