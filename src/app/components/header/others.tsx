import { Logout } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  dividerClasses,
} from "@mui/material";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarOthers(props: any) {
  const history = useHistory()
  const goCarsHandler = () => {
    
    history.push("/dealer/cars");
    window.scrollTo(0,500)
  };
  return (
    <div className="format_others home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box className="border_icons">
            <img src="/icons/sport_icon.svg" className="angel_image" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/"} activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/dealer"} activeClassName="underline">
                Dealers
              </NavLink>
            </Box>
            {verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Order
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/community"} activeClassName="underline">
                Community
              </NavLink>
            </Box>
            {verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/help"} activeClassName="underline">
                Contact us
              </NavLink>
            </Box>
            <Box className="hover-line">
              <IconButton color="primary" aria-label="add to shopping cart">
                <Basket
                  cartItems={props.cartItems}
                  onAdd={props.onAdd}
                  onDelete={props.onDelete}
                  onDeleteAll={props.onDeleteAll}
                  setOrderRebuild={props.setOrderRebuild}
                />
              </IconButton>
            </Box>
            {!verifiedMemberData ? (
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={props.handleLoginOpen}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                src={verifiedMemberData.mb_image}
                onClick={props.handleLogOutClick}
              />
            )}
            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogOut}
              onClick={props.handleCloseLogOut}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={props.handleLogOutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack className="head_information" justifyContent={"row"}>
          <Box className="site_name">
            <span className="name_deco">PROCAR.UZ</span>
          </Box>
          <Box className="center_word_1">
            <div className="center_word_div">
              <span className="center_word_inner1">Exceptional</span>
            </div>
            <div className="center_word_div" style={{ marginLeft: "10px" }}>
              <span className="center_word_inner2">Cars</span>
            </div>
          </Box>
          <Box className="center_word_1" style={{ marginLeft: "210px" }}>
            <div className="center_word_div">
              <span className="center_word_inner2">Exceptional</span>
            </div>
            <div className="center_word_div" style={{ marginLeft: "10px" }}>
              <span className="center_word_inner1">Drivers</span>
            </div>
          </Box>
          <div className="header_shop" onClick={goCarsHandler}>Shop Now</div>
        </Stack>
      </Container>
    </div>
  );
}
