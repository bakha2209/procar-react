import { Box, Container, Stack } from "@mui/material";
import React, { useRef } from "react";
import "../../../css/dealer.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/joy";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { retrieveTargetDealers } from "../DealerPage/selector";
import { createSelector } from "reselect";
import { Dealer } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetDealers } from "../../screens/DealerPage/slice";
import { useEffect, useState } from "react";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { SearchObj } from "../../../types/others";
import DealerApiService from "../../apiServices/dealerApiService";
import { useHistory } from "react-router-dom";

const options = [
  { name: "Recently Added", order: "createdAt" },
  { name: "Most Liked", order: "mb_likes" },
  { name: "Most Viewed", order: "mb_views" },
];

const order_list = Array.from(Array(6).keys());

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetDealers: (data: Dealer[]) => dispach(setTargetDealers(data)),
});

// REDUX SELECTOR
const targetDealersRetriever = createSelector(
  retrieveTargetDealers,
  (targetDealers) => ({
    targetDealers,
  })
);

export function AllDealers() {
  /**INITIALIZATIONS */
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [value, setValue] = React.useState<number | null>(5);
  const { setTargetDealers } = actionDispatch(useDispatch());
  const { targetDealers } = useSelector(targetDealersRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page: 1,
    limit: 5,
    order: "createdAt",
  });
  const refs: any = useRef([]);

  useEffect(() => {
    const dealerService = new DealerApiService();
    dealerService
      .getDealers(targetSearchObject)
      .then((data) => setTargetDealers(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]);

  /**HANDLERS */
  const chosenDealerHandler = (id: string) => {
    history.push(`/dealer/${id}`);
  };
  const searchHandler = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    category: string,
    index: number
  ) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject });
    setSelectedIndex(index);
    setOpen(false);
  };
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="all_dealer">
      <Container>
        <Stack className="main_title">
          <Stack flexDirection={"row"} alignItems={"center"}>
            <div className="vertical_line"></div>
            <div className="dealer_title">Displaying Car Dealerships</div>
          </Stack>
          <React.Fragment>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="Button group with a nested menu"
            >
              <Button onClick={handleClick}>
                {options[selectedIndex].name}
              </Button>
              <Button
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 1,
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option.order}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              searchHandler(event, option.order, index)
                            }
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </React.Fragment>
        </Stack>
        <Stack className="all_dealer_box">
          {targetDealers.map((ele: Dealer) => {
            const image_path = `${serverApi}/${ele.mb_image}`;
            return (
              <Stack className="hor_list">
                <Stack className="hor_list_inner" onClick={() => chosenDealerHandler(ele._id)}>
                  <Box className="dealer_image">
                    <img src={image_path} />
                  </Box>
                  <Box flexDirection={"column"}>
                    <div className="dealer_name">{ele.mb_nick}</div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="readonly"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Box>
                  </Box>
                  <Stack flexDirection={"row"}>
                    <div className="phone_box">
                      <img src="/icons/call_icon.svg" alt="" />
                    </div>
                    <Box flexDirection={"column"}>
                      <div className="dealer_name">Phone</div>
                      <div className="dealer_phone">{ele.mb_phone}</div>
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"}>
                    <Box className="phone_box">
                      <img src="/icons/mail_icon.svg" alt="" />
                    </Box>
                    <Box flexDirection={"column"}>
                      <div className="dealer_name">Email Address</div>
                      <div className="dealer_phone">bakhodir2209@gmail.com</div>
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"} sx={{ marginTop: "10px" }}>
                    <img
                      src="/icons/map_icon.svg"
                      style={{
                        width: "14px",
                        height: "14px",
                        marginTop: "3px",
                        marginRight: "7px",
                      }}
                    />
                    <div className="dealer_phone">Seoul, South Korea</div>
                  </Stack>
                  <Stack className="like_view">
                    <Typography
                      level="body-sm"
                      sx={{
                        fontWeight: "md",
                        color: "text.secondary",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {ele.mb_views}{" "}
                      <VisibilityIcon
                        sx={{ fontsize: 20, marginLeft: "5px" }}
                      />
                    </Typography>
                    <Box sx={{ width: 2, bgcolor: "divider" }} />
                    <Typography
                      level="body-sm"
                      sx={{
                        fontWeight: "md",
                        color: "text.secondary",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div>{ele.mb_likes}</div>
                      <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
        <Stack className="bottom_box">
          <Pagination
            count={
              targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
            }
            page={targetSearchObject.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"primary"}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Stack>
      </Container>
    </div>
  );
}
