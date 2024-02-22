import { Container, Stack } from "@mui/material";
import React from "react";
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

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";

import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";



export function TargetArticles(props: any) {
    return (
        <Stack>
            {props.targetBoArticles.map((ele:any) => {
          return (
            <StyledEngineProvider injectFirst>
              <CssVarsProvider>
                <Card
                  variant="outlined"
                  sx={{
                    minWidth: 600,
                    "--Card-radius": (theme) => theme.vars.radius.xs,
                    my:2
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
                        src="/home/super_car.jpg"
                        sx={{
                          
                          border: "2px solid",
                          borderColor: "background.body",
                        }}
                      />
                    </Box>
                    <Typography fontWeight="lg">Bakha_Sila</Typography>
                    <div className="typeof_article">Celebrity</div>
                  </CardContent>
                  <CardOverflow>
                    <AspectRatio>
                      <img
                        src="/home/super_car.jpg"
                        alt=""
                        loading="lazy"
                      />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent
                    orientation="horizontal"
                    sx={{ alignItems: "center", mx: -1 }}
                  >
                    <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                      <IconButton variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />
                      </IconButton>
                      <IconButton variant="plain" color="neutral" size="sm">
                        <ModeCommentOutlined />
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
                      {[...Array(2)].map((_, index) => (
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
                    >
                      8.1M Likes
                    </Link>
                    <Typography fontSize="sm">
                      <Link
                        component="button"
                        color="neutral"
                        fontWeight="lg"
                        textColor="text.primary"
                      >
                        MUI
                      </Link>{" "}
                      The React component library you always wanted
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
                      2 DAYS AGO
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
    )
}