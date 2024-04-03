import React, { useRef, useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Container, Stack } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import "../../../css/tviewer.css";
import "../../../css/my_page.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { retrieveTargetBoArticles } from "../../screens/CommunityPage/selector";
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
import { setTargetBoArticles } from "../../screens/CommunityPage/slice";
import CommunityApiService from "../../apiServices/communityApiService";
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

const TViewer = (props: any) => {
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const refs: any = useRef([]);
  const editroRef = useRef();
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
  return (
    <Container>
      <Stack className="main_view">
        <Stack className="central_view">
          <Stack className="central_left">
            <Box
              className="card_image"
              flexDirection={"row"}
              justifyContent={"space-between"}
              display={"flex"}
              style={{
                width: "574px",
                height: "305px",
                backgroundImage: `url(${
                  props.chosenSingleBoArticles?.art_image ??
                  "/cars/top_car.webp"
                })`,
                backgroundSize: "cover",
                marginBottom: "12px",
              }}
            >
              <div className="post_type">
                {props.chosenSingleBoArticles?.bo_id}
              </div>
              <Box
                className={"like_btn"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FavoriteIcon
                  className="card_img"
                  fontSize="medium"
                  onClick={(e) => targetLikeHandler(e, props.chosenSingleBoArticles?._id)}
                  sx={{
                    fill:
                      props.chosenSingleBoArticles?.me_liked &&
                      props.chosenSingleBoArticles?.me_liked[0]?.my_favorite
                        ? "#FF3040"
                        : "white",
                  }}
                />
              </Box>
            </Box>
            <Box className="post_desc">
              <Stack flexDirection={"row"} alignItems={"center"}>
                <CalendarMonthIcon fontSize="small" sx={{ fill: "red" }} />
                <span>
                  {moment(props.chosenMemberBoArticles?.createdAt).format("LL")}
                </span>
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
                    (refs.current[props.chosenSingleBoArticles?._id] = element)
                  }
                >
                  {props.chosenSingleBoArticles?.art_likes}
                </span>
                <RemoveRedEyeIcon fontSize="small" style={{ color: "red" }} />
                <span style={{ marginLeft: "5px" }}>
                  {props.chosenSingleBoArticles?.art_views}
                </span>
              </Box>
            </Box>
            <p>{props.chosenSingleBoArticles?.art_subject}</p>
            <span>
              {props.chosenSingleBoArticles?.art_content} <br /> We have covered
              many special events such as fireworks, fairs, parades, races,
              walks, awards ceremonies, fashion shows, sporting events, and even
              a memorial service. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur vulputate vestibulum rhon cus, dolor
              eget viverra pretium, dolor tellus aliquet nunc, vitae ultricies
              erat elit eu lacus. Vestibulum non justo fun consectetur, cursus
              ante, tincidunt sapien. Nulla quis diam sit amet turpis interd
              enim. Vivamus fauc ex sed nibh egestas elementum. Mauris et
              bibendum
            </span>
            <Box className="image_quote">
              <div className="quote_desc">
                Your time is limited, so don't waste it living someone else's
                life. Don't be trapped by dogma - which is living with the
                results
              </div>
              ,<Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Box flexDirection={"row"}>
                  <img src="/auth/chiziqcha.png" />
                  <span >John Mehedii</span>
                </Box>
                <img src="/auth/qoshtirnoq.png"  style={{width:"27px", height:"19px"}} alt="" />
              </Stack>
            </Box>
          </Stack>
          <Stack className="member_right">
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
              {targetBoArticles.map((articles: BoArticle) => {
                const images_path = articles.art_image
                  ? `${serverApi}/${articles.art_image}`
                  : "/home/super_car.jpg";
                return (
                  <Box className="item_blog">
                    <img src={images_path} className="item_image" alt="" />
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
                      <div className="item_topic">{articles.art_subject}</div>
                    </Box>
                  </Box>
                );
              })}
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
          </Stack>
        </Stack>
        <Stack className="review_part"></Stack>
      </Stack>
    </Container>
    // <Stack sx={{ background: "white", mt: "30px", borderRadius: "10px" }}>
    //   <Box sx={{ m: "40px" }}>
    //     <Viewer
    //     //@ts-ignore
    //       ref={editroRef}
    //       initialValue={props.chosenSingleBoArticles?.art_content}
    //       height={"600px"}
    //     />
    //   </Box>
    // </Stack>
  );
};

export default TViewer;
