import { Box, Container, Stack } from "@mui/material";
import React from "react";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const story_list = Array.from(Array(3).keys());

export function Articles() {
  return (
    <Container className="article_con">
        <h4>Popular news & articles from the blog</h4>
      <div className="member_posts">
        {story_list.map((ele) => {
          return (
            <Stack className="post_card">
              <div
                style={{
                  width: "100%",
                  height: "305px",
                  backgroundImage: `url(/home/super_car.jpg)`,
                  backgroundSize: "cover",
                  marginBottom: "12px",
                }}
              >
                <div className="post_type">Evaluation</div>
              </div>
              <Stack style={{background:"#FFF", boxShadow:"0px 9px 19px 0px, rgba(0, 0, 0, 0.04) ",padding:"10px"}}>
              <Box className="post_desc">
                <img src="/icons/user2.svg" alt="" />
                <span>Bakha_Sila /</span>

                <img src="/icons/timer.svg" alt="" />
                <span>{moment().startOf("hour").fromNow()}</span>
                <Box
                  style={{
                    color: "#fff",
                    marginLeft: "25px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Checkbox
                    sx={{ ml: "30px" }}
                    icon={<Favorite />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={false}
                  />
                  <span style={{ marginRight: "10px" }}>100</span>
                  <RemoveRedEyeIcon style={{ color: "red" }} />
                  <span style={{ marginLeft: "10px" }}>1000</span>
                </Box>
              </Box>
              <p>The whimsically named Egg Canvas branch</p>
              <span>
                There are many variations of passages of Lorem Ipsum available,
                but majority have suffered teration in some form, by injected
              </span>
              <div className="read_button">
                <span className="read_icon">Read More</span>
                <img src="/icons/arrow.png" alt="" />
              </div>
              </Stack>
              
            </Stack>
          );
        })}
      </div>
    </Container>
  );
}
