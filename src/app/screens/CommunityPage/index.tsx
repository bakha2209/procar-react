import { Container, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { retrieveTargetBoArticles } from "./selector";
import { createSelector } from "reselect";
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
import { setTargetBoArticles } from "./slice";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispach(setTargetBoArticles(data)),
});

// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);


export function CommunityPage() {
  // INITIALIZATIONS
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const [value, setValue] = React.useState("1");
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    { bo_id: "all", page: 1, limit: 3, order: "updatedAt" }
  );
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj, articlesRebuild]);

  const refs: any = useRef([]);
  /**HANDLERS */
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      if (like_result.like_status > 0) {
        e.target.style.fill = "#FF3040";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handleChange = (category: string) => {
    searchArticlesObj.page = 1;
    searchArticlesObj.order = "updatedAt";
    searchArticlesObj.bo_id = category;
    setSearchArticlesObj({ ...searchArticlesObj });
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({ ...searchArticlesObj });
  };
  const quantity_article = targetBoArticles.length;
    return (
    <Container>
      <h3 className="com_heading">Community Blogs</h3>
      <Stack display={"flex"} flexDirection={"column"} height={"auto"}>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          paddingLeft={"200px"}
          paddingRight={"200px"}
          sx={{ background: "FFF", height: "auto" }}
        >
          <div className="member_posts">
            {targetBoArticles?.map((article: BoArticle) => {
              const quantity_article = targetBoArticles.length;
              const art_image_url = article?.art_image
                ? `${serverApi}/${article.art_image}`
                : "/cars/top_car.webp";
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
                      backgroundImage: `url(${art_image_url})`,
                      backgroundSize: "cover",
                      marginBottom: "12px",
                    }}
                  >
                    <div className="post_type">{article.bo_id}</div>
                    <Box
                      className={"like_btn"}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <FavoriteIcon
                        className="card_img"
                        fontSize="medium"
                        onClick={(e) => targetLikeHandler(e, article._id)}
                        sx={{
                          fill:
                            article?.me_liked &&
                            article?.me_liked[0]?.my_favorite
                              ? "#FF3040"
                              : "white",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box className="post_desc">
                    <Stack flexDirection={"row"} alignItems={"center"}>
                      <img src="/icons/user2.svg" />
                      <span>{article?.member_data.mb_nick} /</span>
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
                      <FavoriteIcon fontSize="small" sx={{ fill: "grey" }} />
                      <span
                        ref={(element) =>
                          (refs.current[article?._id] = element)
                        }
                      >
                        {article?.art_likes}
                      </span>
                      <RemoveRedEyeIcon
                        fontSize="small"
                        style={{ color: "red" }}
                      />
                      <span style={{ marginLeft: "5px" }}>
                        {article?.art_views}
                      </span>
                    </Box>
                  </Box>
                  <p>{article?.art_subject}</p>
                  <span>{article.art_content}</span>
                  <div
                    style={{ flexDirection: "row", cursor: "pointer" }}
                    className="read_more"
                  >
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
              <Stack className="inner_blogs" style={{ width: "100%" }}>
                {targetBoArticles.map((articles: BoArticle) => {
                  const art_images_url = articles?.art_image
                    ? `${serverApi}/${articles.art_image}`
                    : "/cars/top_car.webp";
                  return (
                    <Box className="item_blog">
                      <img src={art_images_url} className="item_image" alt="" />
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
                          <span>{moment(articles.createdAt).format("LL")}</span>
                        </Stack>
                        <div className="item_topic">
                          {articles?.art_subject}
                        </div>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
              <Stack className="category_blog">
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <div className="red_vertical"></div>
                  <div className="line_name">Catagories</div>
                </Stack>
                <Stack className="inner_cat">
                  <Box className="cat_box" onClick={() => handleChange("all")}>
                    <span>All</span>
                    <span>{quantity_article}</span>
                  </Box>
                  <Box
                    className="cat_box"
                    onClick={() => handleChange("evaluation")}
                  >
                    <span>Evaluation</span>
                    <span>03</span>
                  </Box>
                  <Box
                    className="cat_box"
                    onClick={() => handleChange("celebrity")}
                  >
                    <span>Celebrities</span>
                    <span>03</span>
                  </Box>
                  <Box
                    className="cat_box"
                    onClick={() => handleChange("story")}
                  >
                    <span>Story</span>
                    <span>03</span>
                  </Box>
                </Stack>
              </Stack>
              <Stack className="popular_tags">
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  width={"100%"}
                >
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
        <Box className="pagination_box">
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
        </Box>
      </Stack>
    </Container>
  );
}
