import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <div className="footer_config">
      <Stack className="footer_head">
        <Box className="head_up">
          <h1 style={{justifyContent:"center"}}>Join Our Newsletter</h1>
          <p>
            Be the first to know about our latest updates, exclusive offers, and
            more.
          </p>
        </Box>
        <Box style={{display:"flex", flexDirection:"row"}}>
            <div className="email_box"><span>Enter your email</span></div>
            <Button variant="contained" color="secondary" style={{marginLeft:"4px"}}>Subscribe</Button>
        </Box>
      </Stack>
      <Stack className="footer_up">
        <Stack className="footer_up_left">
          <Box className="footer_logo">
            <img
              src="/icons/sport_icon.svg"
              style={{ width: "18px", height: "17px" }}
            />
            <span>PROCAR.UZ</span>
          </Box>
          <Box className="social_icons">
            <Box>
              <img src="/icons/facebook_icon.svg" />
            </Box>
            <Box>
              <img src="/icons/insta_icon.svg" />
            </Box>
            <Box>
              <img src="/icons/youtube_icon.svg" />
            </Box>
            <Box>
              <img src="/icons/twitter_icon.svg" />
            </Box>
          </Box>
        </Stack>
        <Stack className="footer_up_2">
          <Box style={{ width: "100%", height: "7px", marginBottom: "8px" }}>
            <span>Product & Service</span>
          </Box>
          <Box className="footer_up_2_1">
            <span style={{ marginBottom: "6px" }}>Products</span>
            <span style={{ marginBottom: "6px" }}>Services</span>
            <span style={{ marginBottom: "6px" }}>Appliances</span>
            <span style={{ marginBottom: "6px" }}>Storage</span>
            <span style={{ marginBottom: "6px" }}>Lifestyle</span>
          </Box>
        </Stack>
        <Stack className="footer_up_2">
          <Box style={{ width: "100%", height: "7px", marginBottom: "8px" }}>
            <span>Buy Now</span>
          </Box>
          <Box className="footer_up_2_1">
            <span style={{ marginBottom: "6px" }}>Offers</span>
            <span style={{ marginBottom: "6px" }}>Promos</span>
            <span style={{ marginBottom: "6px" }}>Online Purchase FAQ</span>
            <span style={{ marginBottom: "6px" }}>Business Offer</span>
          </Box>
        </Stack>
        <Stack className="footer_up_2">
          <Box style={{ width: "100%", height: "7px", marginBottom: "8px" }}>
            <span>Support</span>
          </Box>
          <Box className="footer_up_2_1">
            <span style={{ marginBottom: "6px" }}>Contact</span>
            <span style={{ marginBottom: "6px" }}>Email Support</span>
            <span style={{ marginBottom: "6px" }}>Live Chat</span>
            <span style={{ marginBottom: "6px" }}>Phone Support</span>
            <span style={{ marginBottom: "6px" }}>Community</span>
          </Box>
        </Stack>
      </Stack>
      <Stack className="footer_down">
        <Box className="down_left">
            <span>English</span>
            <div className="black_point"></div>
            <span>Privacy</span>
            <div className="black_point"></div>
            <span>Legal</span>
        </Box>
        <div className="down_right">© 2024 PROCAR.UZ. All Rights Reserved.</div>
      </Stack>
    </div>
  );
}
