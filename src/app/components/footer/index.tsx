import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import zIndex from "@mui/material/styles/zIndex";
import { carData } from "../brands&&car_types";

const carDatas= carData.slice(0,6)

export function Footer() {
  return (
    <div className="footer_config">
      <Container className="footer_basic">
        <Stack className="footer_head">
          <div className="head_subs">
            Subscribe newsletter to Get News & update
          </div>
          <Stack className="head_email">
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <MailOutlineIcon />
                <div className="ver_line"></div>
                <div className="email_enter">Enter your Email</div>
              </Stack>
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <button className="red_subs">
                <span>Subscribe</span>
                <SendIcon fontSize="medium" />
              </button>
            </Stack>
          </Stack>
        </Stack>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#18181A",
            marginTop: "10px",
          }}
        ></div>
        <Stack className="foot_middle">
          <Box flexDirection={"column"}>
            <div className="middle_heading">Quick links</div>
            <p className="middle_links">
              Change Oil and Filter <br /> Belt Replace <br /> Brake Pads
              Replace <br /> purchase Car Inspect <br />
              Mobile App <br />
              Shopping & Auctions
              <br /> Chevrolet Suburban
            </p>
          </Box>
          <Box flexDirection={"column"}>
            <div className="middle_heading">Company</div>
            <p className="middle_links">
              About Us <br /> Contact Us <br /> FAQs? <br /> News <br />
              AutoproGlobal <br />
              Advanced Search
              <br /> Site Map
            </p>
          </Box>
          <Box flexDirection={"column"}>
            <div className="middle_heading">New Vehicles</div>
            <p className="middle_links">
              Pickup <br />
              Hatchback
              <br /> Sedan
              <br /> Convertible <br />
              SUVs <br />
              Wagon
              <br /> MiniVan
            </p>
          </Box>
          <Stack flexDirection={"column"}>
            <div className="middle_heading">Recent Post</div>
            <Box className={"image_wrap"}>
              {carDatas.map((ele)=>{
                const image_path = ele.image
                return (
                  <img className={"images_in_foot"} src={image_path} alt="" />
                )
              })}
            </Box>
            <Stack flexDirection={"row"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="29"
                viewBox="0 0 32 29"
                fill="none"
              >
                <path
                  d="M25.375 0H21.625H17.875C14.2568 0 11.25 2.94431 11.25 6.5625C11.25 9.863 13.7616 12.6023 16.9375 13.0582V15.9375C16.9375 16.3165 17.1654 16.6589 17.5161 16.8036C17.8619 16.9479 18.2676 16.8705 18.5379 16.6003L21.625 13.5132L22.0132 13.125H25.375C28.9932 13.125 32 10.1807 32 6.5625C32 2.94431 28.9932 0 25.375 0Z"
                  fill="#FED843"
                />
                <path
                  d="M25.375 13.125C28.9932 13.125 32 10.1807 32 6.5625C32 2.94431 28.9932 0 25.375 0H21.625V13.5132L22.0132 13.125H25.375Z"
                  fill="#FABE2C"
                />
                <path
                  d="M23.875 21.5625V25.3125C23.875 26.9438 22.5431 28.125 21.0756 28.125C15.675 28.125 10.4062 25.5719 6.4875 21.6688C2.56875 17.7656 0 12.5125 0 7.11187C0 5.56062 1.26188 4.3125 2.8125 4.3125H6.5625C6.96625 4.3125 7.32438 4.57063 7.45125 4.95312L9.32625 10.565C9.41813 10.84 9.3775 11.1413 9.2175 11.3819L7.6275 13.7675C8.23 15.0312 9.29625 16.4125 10.5275 17.6287C11.7594 18.8444 13.1562 19.895 14.42 20.4975L16.8056 18.9075C17.0475 18.7481 17.3475 18.7063 17.6225 18.7987L23.2475 20.6737C23.63 20.8006 23.875 21.1588 23.875 21.5625Z"
                  fill="#D01818"
                />
                <path
                  d="M23.8777 21.5627V25.3127C23.8777 26.9439 22.5459 28.1252 21.0784 28.1252C15.6777 28.1252 10.409 25.572 6.49023 21.6689L10.5302 17.6289C11.7621 18.8445 13.159 19.8952 14.4227 20.4977L16.8084 18.9077C17.0502 18.7483 17.3502 18.7064 17.6252 18.7989L23.2502 20.6739C23.6327 20.8008 23.8777 21.1589 23.8777 21.5627Z"
                  fill="#F03800"
                />
                <path
                  d="M17.875 7.5C18.3928 7.5 18.8125 7.08027 18.8125 6.5625C18.8125 6.04473 18.3928 5.625 17.875 5.625C17.3572 5.625 16.9375 6.04473 16.9375 6.5625C16.9375 7.08027 17.3572 7.5 17.875 7.5Z"
                  fill="#613D5C"
                />
                <path
                  d="M21.625 7.5C22.1428 7.5 22.5625 7.08027 22.5625 6.5625C22.5625 6.04473 22.1428 5.625 21.625 5.625C21.1072 5.625 20.6875 6.04473 20.6875 6.5625C20.6875 7.08027 21.1072 7.5 21.625 7.5Z"
                  fill="#613D5C"
                />
                <path
                  d="M22.5625 6.5625C22.5625 6.04475 22.1428 5.625 21.625 5.625V7.5C22.1428 7.5 22.5625 7.08025 22.5625 6.5625Z"
                  fill="#4B2746"
                />
                <path
                  d="M25.375 7.5C25.8928 7.5 26.3125 7.08027 26.3125 6.5625C26.3125 6.04473 25.8928 5.625 25.375 5.625C24.8572 5.625 24.4375 6.04473 24.4375 6.5625C24.4375 7.08027 24.8572 7.5 25.375 7.5Z"
                  fill="#4B2746"
                />
              </svg>
              <Box flexDirection={"column"} sx={{ marginLeft: "10px" }}>
                <p className="middle_link">Phone:</p>
                <p className="middle_headings">+821056817724</p>
              </Box>
            </Stack>
          </Stack>
          <Stack flexDirection={"column"}>
            <div className="middle_heading">About Store</div>
            <p className="store_desc">
              Corporate clients and leisure travelers relying on Groundlink for
              dependable service in major cities across World.
            </p>
            <Box flexDirection={"row"}>
              <YouTubeIcon sx={{ marginRight: "10px" }} />
              <FacebookIcon sx={{ marginRight: "10px" }} />
              <TwitterIcon sx={{ marginRight: "10px" }} />
              <InstagramIcon />
            </Box>
            <Box flexDirection={"row"} sx={{ marginTop: "10px" }}>
              <img
                className="stores_image"
                src="/icons/google_img.png"
                alt=""
              />
              <img className="stores_image" src="/icons/apple_img.png" alt="" />
            </Box>
          </Stack>
        </Stack>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#18181A",
            marginTop: "10px",
          }}
        ></div>
        <Stack className="foot_bottom">
          <Stack flexDirection={"column"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="81"
              height="20"
              viewBox="0 0 122 27"
              fill="none"
            >
              <path
                d="M0.386719 26.0249C1.59545 23.3363 6.94625 13.3539 20.182 11.8816C23.0853 11.5578 25.7851 11.4109 28.6808 11.4109C31.456 11.4109 34.0429 11.5503 36.7804 11.6971C39.8343 11.8628 42.9935 12.0322 46.7704 12.0322C52.5241 12.0322 58.4623 11.6331 65.3381 10.7783C61.599 11.667 51.2927 13.7945 38.3281 13.7945C35.7412 13.7945 33.1467 13.7079 30.6201 13.5422C29.7728 13.4857 28.9143 13.4556 28.067 13.4556C14.9329 13.4518 5.07855 20.0942 0.386719 26.0249Z"
                fill="#F02E2E"
              />
              <path
                d="M63.5092 11.0867C58.8324 12.0883 49.5768 13.6962 38.3104 13.6962C35.7234 13.6962 33.1328 13.6096 30.6099 13.4439C29.7589 13.3874 28.9003 13.3573 28.0531 13.3573C15.3106 13.3573 5.64827 19.593 0.771931 25.3806C1.40077 24.1041 2.56808 22.0707 4.42448 19.9809C7.23356 16.8141 12.2455 12.8565 20.1756 11.9754C23.0751 11.6515 25.7712 11.5047 28.6631 11.5047C31.4345 11.5047 34.0214 11.644 36.759 11.7909C39.8128 11.9565 42.9758 12.126 46.7526 12.126C51.9942 12.1222 57.3902 11.7909 63.5092 11.0867ZM66.8605 10.4805C58.2902 11.6064 51.9604 11.934 46.7526 11.934C39.5718 11.934 34.5185 11.3126 28.6631 11.3126C26.0687 11.3126 23.3161 11.4331 20.153 11.7871C4.66924 13.5079 0 26.6533 0 26.6533C4.95918 19.9658 15.2767 13.5456 28.0493 13.5456C28.889 13.5456 29.7363 13.572 30.5948 13.6284C33.2495 13.8054 35.8289 13.8807 38.3104 13.8807C54.8184 13.8845 66.8605 10.4805 66.8605 10.4805Z"
                fill="#F02E2E"
              />
              <path
                d="M32.4297 10.0668C32.4297 10.0668 53.7877 -1.25235 67.8782 0.114532C88.1518 2.08013 99.0266 7.97692 116.107 8.22545C116.107 8.22545 106.893 9.57727 88.4606 6.62887C64.2069 2.74663 61.0589 -0.273316 32.4297 10.0668Z"
                fill="white"
              />
              <path
                d="M43.8848 15.0458C43.8848 15.0458 55.283 14.6316 68.9706 10.9678C82.7825 7.27003 85.5427 6.78051 93.454 8.52395C93.454 8.52395 85.9192 8.3432 73.5759 11.864C61.2325 15.3847 54.2399 16.2131 43.8848 15.0458Z"
                fill="white"
                stroke="white"
                stroke-width="0.75"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M114.815 26.0992C115.861 24.849 117.887 21.8931 116.746 18.8694C114.882 13.9404 105.83 11.0522 89.8379 10.2803C91.5324 10.1184 94.8234 9.8623 98.7772 9.8623C105.732 9.8623 115.383 10.6568 121.909 14.4449C121.668 15.2395 119.363 22.6462 114.815 26.0992Z"
                fill="#F02E2E"
              />
            </svg>
            <Box className="logo_name">
              <p className="logo_procar">
                Procar.<span>Uz</span>
              </p>
            </Box>
          </Stack>
          <p className="bottom_2024">
            © 2024 <span>ui-theme . All Rights Reserved.</span>
          </p>
          <Box flexDirection={"row"}>
            <p className="terms">
              Terms and Conditions <span>Privacy Policy</span>     
            </p>
            
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
