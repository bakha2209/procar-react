import {
    Badge,
    Box,
    Button,
    Container,
    IconButton,
    Stack,
    dividerClasses,
  } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export function NavbarDealer(props: any) {
    return (
        <div className="format_dealer home_navbar">
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
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Order
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/community"} activeClassName="underline">
                  Community
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/help"} activeClassName="underline">
                  Contact us
                </NavLink>
              </Box>
              <Box className="hover-line">
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </Box>
              <Box>
                <Button variant="contained" color="success">
                  Login
                </Button>
                
              </Box>
              
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
           
            
            
          </Stack>
        </Container>
      </div> 
    )
}