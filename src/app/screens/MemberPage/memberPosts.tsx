import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Stack,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";



const story_list = Array.from(Array(3).keys());
export function MemberPosts() {
  const [cartChange, setCartChange] = useState<number>(-1);
  return (
    <Container>
      <Stack
        display={"flex"}
        flexDirection={"row"}
        style={{ paddingRight: "100px", paddingLeft: "100px" }}
        sx={{ background: "FFF" }}
      >
        <div className="member_posts">
          {story_list.map((ele) => {
            return (
              <Stack className="post_card">
                <Box
                  className="card_image"
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  display={"flex"}
                  style={{
                    width: "100%",
                    height: "305px",
                    backgroundImage: `url(/home/super_car.jpg)`,
                    backgroundSize: "cover",
                    marginBottom: "12px",
                  }}
                >
                  <div className="post_type">Evaluation</div>
                  <Box
                    className={
                      "like_btn"
                    }
                  >
                    <FavoriteIcon
                      className="card_img"
                      fontSize="medium"
                      sx={{ fill: "white" }}
                    />
                  </Box>
                </Box>
                <Box className="post_desc">
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <img src="/icons/user2.svg" />
                    <span>Bakha_Sila /</span>
                    <div style={{ flexDirection: "row", cursor: "pointer" }}>
                      <img src="/icons/comment.svg" alt="" />
                      <span>(03)</span>
                    </div>
                    {/* <img src="/icons/timer.svg" alt="" />
                  <span>{moment().format("YY-MM-DD")}</span> */}
                  </Stack>

                  <Box
                    style={{
                      color: "#fff",
                      marginLeft: "100px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Checkbox
                      sx={{ ml: "10px" }}
                      icon={<Favorite fontSize="small" />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      checked={false}
                    />
                    <span >100</span>
                    <RemoveRedEyeIcon
                      fontSize="small"
                      style={{ color: "red" }}
                    />
                    <span style={{ marginLeft: "5px" }}>1000</span>
                  </Box>
                </Box>
                <p>The whimsically named Egg Canvas brainch</p>
                <span>
                  There are many variations of passages of Lorem Ipsum
                  available, but majority have suffered teration in some form,
                  by injected humour, or randomised words which don't look even
                  slight believable. If you are going to use a passage of Lorem
                  Ipsum.
                </span>
                <div style={{ flexDirection: "row", cursor: "pointer" }}>
                  <span className="read_icon">Read More</span>
                  <img src="/icons/direction.svg" alt="" />
                </div>
              </Stack>
            );
          })}
        </div>
        <div className="member_right">
          <img src="/dealer/dealer_ads.webp" className="image_ad" alt="" />
          <Stack className="search_here">
            <Stack flexDirection={"row"} alignItems={"center"} width={"100%"}>
              <div className="red_vertical"></div>
              <div className="line_name">Search Here</div>
            </Stack>
            <Box flexDirection={"row"} alignItems={"center"}>
              <form className="search_form" action="">
                <input
                  type="search"
                  className="Single_searchInput"
                  name="Single_resSearch"
                  placeholder="Search here..."
                />
                <SearchIcon />
              </form>
            </Box>
          </Stack>
          <Stack className="recent_blog">
            <Stack flexDirection={"row"} alignItems={"center"} width={"100%"}>
              <div className="red_vertical"></div>
              <div className="line_name">Recent Blog</div>
            </Stack>
            <Stack className="inner_blogs">
              {story_list.map((ele) => {
                return (
                  <Box className="item_blog">
                    <img
                      src="/dealer/dealer_ads.webp"
                      className="item_image"
                      alt=""
                    />
                    <Box flexDirection={"column"} height={"56px"}>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        height={"auto"}
                      >
                        <CalendarMonthIcon
                          fontSize="small"
                          style={{ color: "red" }}
                        />
                        <span>{moment().format("LL")}</span>
                      </Stack>
                      <div className="item_topic">
                        Budget Issues Force The Our To Become
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
            <Stack className="category_blog">
              <Stack flexDirection={"row"} alignItems={"center"} width={"100%"}>
                <div className="red_vertical"></div>
                <div className="line_name">Catagories</div>
              </Stack>
              <Stack className="inner_cat">
                <Box className="cat_box">
                  <span>All</span>
                  <span>03</span>
                </Box>
                <Box className="cat_box">
                  <span>Evaluation</span>
                  <span>03</span>
                </Box>
                <Box className="cat_box">
                  <span>Celebrities</span>
                  <span>03</span>
                </Box>
                <Box className="cat_box">
                  <span>Story</span>
                  <span>03</span>
                </Box>
              </Stack>
            </Stack>
            <Stack className="popular_tags">
              <Stack flexDirection={"row"} alignItems={"center"} width={"100%"}>
                <div className="red_vertical"></div>
                <div className="line_name">Popular tags</div>
              </Stack>
              <Stack className="box_wrap">
                <div className="small_boxes">Design</div>
                <div className="small_boxes">Marketing</div>
                <div className="small_boxes">Search</div>
                <div className="small_boxes">Branding</div>
                <div className="small_boxes">Startup</div>
                <div className="small_boxes">Tech</div>
                <div className="small_boxes">Landing</div>
                <div className="small_boxes">Coding</div>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
}
