import { Box, Container, Stack } from "@mui/material";
import React from "react";
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

const options = ["Recently Added", "Most Viewev", "Most Liked"];
const order_list = Array.from(Array(6).keys());

export function AllDealers() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [value, setValue] = React.useState<number | null>(5);

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
              <Button onClick={handleClick}>{options[selectedIndex]}</Button>
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
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleMenuItemClick(event, index)
                            }
                          >
                            {option}
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
          {order_list.map((ele) => {
            return (
              <Stack className="hor_list">
                <Stack className="hor_list_inner">
                  <Box flexDirection={"column"}>
                    <div className="dealer_name">West Covins Motors</div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="simple-controlled"
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
                      <div className="dealer_phone">+821056817724</div>
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
                      10{" "}
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
                      <div>50</div>
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
              count={3}
              page={1}
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
            />
            
          </Stack>
      </Container>
    </div>
  );
}
