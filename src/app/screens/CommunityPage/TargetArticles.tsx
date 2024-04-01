import { Container, Stack } from "@mui/material";
import React, { useRef } from "react";
import "../../../css/community.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../lib/config";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import Moment from "react-moment";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Favorite } from "@mui/icons-material";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import Checkbox from "@mui/joy/Checkbox";
import { Switch } from "@mui/joy";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function TargetArticles(props: any) {
  const refs: any = useRef([]);
  /**HANDLERS */
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
      props.setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const date = new Date();
  return (
    <Stack>
      {props.targetBoArticles.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/cars/top_car.webp";
        return (
          <StyledEngineProvider injectFirst>
            <CssVarsProvider key={article?._id}>
              <Card
                variant="outlined"
                sx={{
                  minWidth: 600,
                  "--Card-radius": (theme) => theme.vars.radius.xs,
                  my: 2,
                }}
              >
                <CardContent
                  orientation="horizontal"
                  sx={{ alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        m: "-2px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                      },
                    }}
                  >
                    <Avatar
                      size="md"
                      src={
                        article?.member_data.mb_image ?? "/cars/top_car.webp"
                      }
                      sx={{
                        border: "2px solid",
                        borderColor: "background.body",
                      }}
                    />
                  </Box>
                  <Typography fontWeight="lg">
                    {article?.member_data.mb_nick}
                  </Typography>
                  <div className="typeof_article">{article?.bo_id}</div>
                </CardContent>
                <CardOverflow>
                  <AspectRatio>
                    <img src={art_image_url} alt="" loading="lazy" />
                  </AspectRatio>
                </CardOverflow>
                <CardContent
                  orientation="horizontal"
                  sx={{ alignItems: "center", mx: -1 }}
                >
                  <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                    <Switch
                      
                      
                      id={article?._id}
                      onClick={targetLikeHandler}
                      checked={
                        article?.me_liked && article?.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />

                    <IconButton variant="plain" color="neutral" size="sm">
                      <RemoveRedEyeIcon />
                      <Typography marginLeft={"5px"}>
                        {article?.art_views}{" "}
                      </Typography>
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mx: "auto",
                    }}
                  >
                    {[...Array(1)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: "50%",
                          width: `max(${6 - index}px, 3px)`,
                          height: `max(${6 - index}px, 3px)`,
                          bgcolor:
                            index === 0
                              ? "primary.solidBg"
                              : "background.level3",
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      width: 0,
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <IconButton variant="plain" color="neutral" size="sm">
                      <BookmarkBorderRoundedIcon />
                    </IconButton>
                  </Box>
                </CardContent>
                <CardContent>
                  <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    fontWeight="lg"
                    textColor="text.primary"
                    ref={(element) => (refs.current[article._id] = element)}
                  >
                    {article?.art_likes} Likes
                  </Link>
                  <Typography fontSize="sm">
                    <Link
                      component="button"
                      color="neutral"
                      fontWeight="lg"
                      textColor="text.primary"
                    >
                      {article?.art_subject}
                    </Link>{" "}
                    {article?.art_content}
                  </Typography>
                  <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    startDecorator="…"
                    sx={{ color: "text.tertiary" }}
                  >
                    more
                  </Link>
                  <Link
                    component="button"
                    underline="none"
                    fontSize="10px"
                    sx={{ color: "text.tertiary", my: 0.5 }}
                  >
                    <Moment style={{ fontSize: "12px" }} fromNow ago>
                      {date}
                    </Moment>{" "}
                  </Link>
                </CardContent>
                <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{ ml: -1 }}
                  >
                    <Face />
                  </IconButton>
                  <Input
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
                  />
                  <Link disabled underline="none" role="button">
                    Post
                  </Link>
                </CardContent>
              </Card>
            </CssVarsProvider>
          </StyledEngineProvider>
        );
      })}
    </Stack>
  );
}
