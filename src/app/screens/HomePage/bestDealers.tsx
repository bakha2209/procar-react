import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import "../../../css/homepage.css";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Typography,
  Link,
} from "@mui/joy";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CallIcon from "@mui/icons-material/Call";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

const order_list = Array.from(Array(6).keys());

export function BestDealers() {
  return (
    <div className="all_vehicle">
      <Container>
        <Stack className="main_stack">
          <Box flexDirection={"row"} justifyContent={"flex-start"}>
            <p className="main_text_desc">Trusted Car Delaer Service</p>
          </Box>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <p className="brand_blue_text">Explore all Vehicles</p>
            <Box marginTop={"20px"}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button>popular</Button>
                <Button>recent</Button>
                <Button>best</Button>
              </ButtonGroup>
            </Box>
          </Stack>
          <Stack className="all_car_box">
            <CssVarsProvider>
              {order_list.map((ele) => {
                return (
                  <Card
                    variant="outlined"
                    sx={{ minHeight: 483, minWidth: 330, mr: "35px" }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <Swiper
                          effect={"flip"}
                          grabCursor={true}
                          pagination={true}
                          navigation={true}
                          modules={[EffectFlip, Pagination, Navigation]}
                          className="mySwiper"
                        >
                          <SwiperSlide>
                            <img
                              src="/cars/top_car.webp"
                              width={"330px"}
                              height={"330px"}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="/cars/top_car.webp"
                              width={"330px"}
                              height={"330px"}
                            />{" "}
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="/cars/top_car.webp"
                              width={"330px"}
                              height={"330px"}
                            />{" "}
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="/cars/top_car.webp"
                              width={"330px"}
                              height={"330px"}
                            />{" "}
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="/cars/top_car.webp"
                              width={"330px"}
                              height={"330px"}
                            />{" "}
                          </SwiperSlide>
                        </Swiper>
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite style={{ color: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" fontSize="md" mt="2">
                      Chevrolet Suburban 2021
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link textColor="neutral.700">
                        For 15 years, we raising the standard of
                      </Link>
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        startDecorator={<LocalGasStationIcon />}
                        textColor="#000"
                      >
                        15/100
                      </Link>
                      <Link
                        startDecorator={<SpeedIcon />}
                        textColor="#000"
                        sx={{ ml: "7px" }}
                      >
                        1500cc
                      </Link>
                      <Link textColor="#000" sx={{ ml: "7px" }}>
                        <img
                          src="/icons/gearbox.png"
                          style={{
                            width: "18px",
                            height: "14px",
                            marginLeft: "7px",
                          }}
                          alt=""
                        />{" "}
                        manual
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: "700",
                            fontFamily: "Plus Jakarta Sans",
                            color: "#D01818",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          $112000
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: "500",
                            fontFamily: "Plus Jakarta Sans",
                            color: "#86898E",
                            textDecoration: "line-through",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          $112000
                        </Typography>
                        <Stack flexDirection={"row"}>
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: "md",
                              color: "text.secondary",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            100{" "}
                            <VisibilityIcon
                              sx={{ fontsize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Box sx={{ width: 2, bgcolor: "divider" }} />
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: "md",
                              color: "text.secondary",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <div>50</div>
                            <Favorite
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
