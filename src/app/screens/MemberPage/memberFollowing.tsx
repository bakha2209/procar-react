import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { retrieveMemberFollowings } from "./selector";
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
import { setMemberFollowings } from "./slice";
import { BoArticle } from "../../../types/boArticle";
import { FollowSearchObj, Follower, Following } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispach(setMemberFollowings(data)),
});

// REDUX SELECTOR
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

export function MemberFollowing(props: any) {
  /**INITIALIZATION */
  const history = useHistory();
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const { mb_id, followRebuild, setFollowRebuild } = props;
  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSearchObj>({
      page: 1,
      limit: 5,
      mb_id: mb_id,
    });
  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild]);

  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(id);

      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    setFollowingsSearchObj({ ...followingsSearchObj });
  };
  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <Stack>
      {memberFollowings?.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serverApi}/${following.follow_member_data.mb_image}`
          : "/icons/default_img.svg";
        return (
          <Box className={"follow_box"}>
            <Avatar
              src={image_url}
              sx={{ width: 89, height: 89 }}
              style={{ cursor: "pointer" }}
              onClick={() => visitMemberHandler(following?.follow_id)}
            />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">
                {following?.follow_member_data?.mb_type}
              </span>
              <span
                className="name_text"
                style={{ cursor: "pointer" }}
                onClick={() => visitMemberHandler(following?.follow_id)}
              >
                {following?.follow_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enabled && (
              <Button
                variant="contained"
                startIcon={
                  <img
                    src="/icons/user.svg"
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                className="follow_cancel_btn"
                onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
              >
                Bekor Qilish
              </Button>
            )}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className={"bottom_box"}>
          <Pagination
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
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
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
