import { Box, Container, Stack, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import React from "react";
import "../../../css/homepage.css";

const category_list = Array.from(Array(10).keys());

export function ByCategories() {
  return (
    <div className="category_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"top_text"}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              height={"30px"}
            >
              <div
                style={{
                  width: "2px",
                  height: "18px",
                  background: "#D01818",
                  marginRight: "9px",
                  marginTop: "30px",
                }}
              ></div>
              <p>Browse By Vehicle Type</p>
            </Box>
            <Box className="top_text_view">
              <p>view more</p>
              <div style={{marginTop:"5px",marginLeft:"4px"}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="#D01818"
                >
                  <path
                    d="M17.7502 5.4267L12.3957 0.235999C12.3209 0.161661 12.2298 0.102266 12.1282 0.0616265C12.0265 0.0209873 11.9166 0 11.8055 0C11.6944 0 11.5845 0.0209873 11.4828 0.0616265C11.3812 0.102266 11.29 0.161661 11.2153 0.235999C11.058 0.393066 10.9709 0.597404 10.9709 0.809306C10.9709 1.02121 11.058 1.22554 11.2153 1.3826L15.1414 5.18755H0.834375C0.607683 5.20244 0.395625 5.29439 0.240835 5.44491C0.0860445 5.59543 0 5.79338 0 5.99894C0 6.2045 0.0860445 6.40243 0.240835 6.55296C0.395625 6.70348 0.607683 6.79543 0.834375 6.81031H15.1391L11.2129 10.6174C11.0556 10.7745 10.9685 10.9788 10.9685 11.1907C10.9685 11.4026 11.0556 11.6069 11.2129 11.764C11.2877 11.8383 11.3788 11.8977 11.4805 11.9384C11.5821 11.979 11.692 12 11.8031 12C11.9143 12 12.0242 11.979 12.1258 11.9384C12.2274 11.8977 12.3186 11.8383 12.3934 11.764L17.7502 6.58398C17.9108 6.42629 18 6.21974 18 6.00534C18 5.79094 17.9108 5.58439 17.7502 5.4267Z"
                    fill="#D01818"
                  />
                </svg>
              </div>
            </Box>
          </Box>
          <Stack
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            flexDirection={"row"}
            
          >
            <Swiper
              className="cars_avatars_wrapper"
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".car-next",
                prevEl: ".car-prev",
              }}
            >
              {category_list.map((ele, index) => {
                return (
                  <SwiperSlide
                    style={{ cursor: "pointer" }}
                    key={index}
                    className="car_avatars"
                  >
                    <img src="/categories/hatchback.webp" alt="" />
                    <div className="car_avatars_text">
                      <span>Hatchback</span>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Container>
    </div>
  );
}
