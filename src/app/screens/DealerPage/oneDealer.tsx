import { Box, Container, Button } from "@mui/material";
import React from "react";

import Option from "@mui/joy/Option";
import { Select } from "antd";
import { StyledEngineProvider } from "@mui/material/styles";
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
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Selects, { SelectChangeEvent } from "@mui/material/Select";
import Slider from '@mui/material/Slider';
import Typographys from '@mui/material/Typography';

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const order_list = Array.from(Array(6).keys());
const car_list = Array.from(Array(5).keys());

export function OneDealer() {
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    alert(`You chose "${newValue}"`);
  };
  const [make, setMake] = React.useState("");

  const handleClick = (event: SelectChangeEvent) => {
    setMake(event.target.value);
  };
  const [val, setVal] = React.useState<number>(MIN);
  const handlePrice = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };
  return (
    <div className="one_dealer">
      <Container>
        <Stack flexDirection={"column"}>
          <div className="dealer_page_title">West Covina Motors</div>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <img
              src="/icons/map_icon.svg"
              style={{ width: "17px", height: "17px", marginRight: "3px" }}
            />
            <p className="title_address">Seoul, South Korea</p>
          </Stack>
        </Stack>
        <Stack className="central_info">
          <Stack className="info_left">
            <Stack flexDirection={"column"}>
              <div className="big_image">
                <img
                  src="/dealer/dealer_image4.jpg"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <Stack className="image_desc">
                <Stack flexDirection={"row"} sx={{ marginRight: "10px" }}>
                  <div className="map_box">
                    <img src="/icons/map_icon.svg" alt="" />
                  </div>
                  <Box flexDirection={"column"}>
                    <div className="dealer_names">Phone Number</div>
                    <div className="dealer_phones">+821056817724</div>
                  </Box>
                </Stack>
                <Stack flexDirection={"row"} sx={{ marginRight: "10px" }}>
                  <div className="map_box">
                    <img src="/icons/map_icon.svg" alt="" />
                  </div>
                  <Box flexDirection={"column"}>
                    <div className="dealer_names">Email Address</div>
                    <div className="dealer_phones">bakhodir2209@gmail.com</div>
                  </Box>
                </Stack>
                <Stack flexDirection={"row"} sx={{ marginRight: "10px" }}>
                  <div className="map_box">
                    <img src="/icons/map_icon.svg" alt="" />
                  </div>
                  <Box flexDirection={"column"}>
                    <div className="dealer_names">Visit Website</div>
                    <div className="dealer_phones">www.DealerDemo.com</div>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Box flexDirection={"column"}>
              <h2 style={{ color: "#1B1B1B" }}>Introduction</h2>
              <p style={{ width: "575px", color: "#83827F" }}>
                There are many variations of passages of Lorem Ipsum available,
                but majority have suffered teration in some form, by injected
                humour, or randomised words which don't look even slight
                believable. If you are going to use a passa In publishing and
                vfx graphic design, Lorem ipsum is a placeholder text commonly
                used to demonstrate the visual fo of a document or a typeface
                without relying on meaningful content. Lorem ipsum may be used
                as a placeholder before final copy is available.
              </p>
            </Box>
            <Stack className="inventory_sec">
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <h2 style={{ color: "#000" }}>Dealer Inventory</h2>

                <Select
                  showSearch
                  style={{ width: 200,marginTop:"20px",marginRight:"20px" }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Recently",
                    },
                    {
                      value: "2",
                      label: "Most Viewed",
                    },
                    {
                      value: "3",
                      label: "Most Liked",
                    },
                  ]}
                />
              </Stack>
              <div className="invent_line"></div>
              <Stack className="all_invent_box">
                <CssVarsProvider>
                  {order_list.map((ele) => {
                    return (
                      <Card
                        variant="outlined"
                        sx={{
                          height: "auto",
                          maxWidth: "auto",
                          mr: "10px",
                          mb: "10px",
                        }}
                      >
                        <CardOverflow>
                          <AspectRatio ratio={"1"}>
                            <Swiper
                              effect={"flip"}
                              grabCursor={true}
                              pagination={false}
                              navigation={true}
                              modules={[EffectFlip, Pagination, Navigation]}
                              className="mySwiper"
                            >
                              {car_list.map((ele, index) => {
                                return (
                                  <SwiperSlide
                                    className="car_img"
                                    style={{
                                      backgroundImage: `url(/cars/top_car.webp)`,
                                      cursor: "pointer",
                                    }}
                                  >
                                    <div className="view_btn">
                                      View Details{" "}
                                      <img
                                        src="/icons/arrow-right.svg"
                                        style={{ marginLeft: "9px" }}
                                      />
                                    </div>
                                    <div className="view_btn">Add to Cart </div>
                                  </SwiperSlide>
                                );
                              })}
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
                        <Typography level="h3" fontSize="sm" mt="1">
                          Sedan
                        </Typography>
                        <Typography level="h2" fontSize="md" mt="0.5">
                          Chevrolet Suburban 2021
                        </Typography>
                        <Typography level="body-sm">
                          <Link textColor="neutral.700">
                            15 years raising standarts
                          </Link>
                        </Typography>
                        <Typography level="body-sm">
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
          </Stack>
          <Stack className="info_right">
            <Stack className="seller_page">
              <Stack className="seller_avatar">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src="/cars/top_car.webp" />
                </StyledBadge>
              </Stack>
              <div className="seller_name">
                <h2>Rosalina D. Willaim</h2>
                <p>Webcost car Dealer</p>
              </div>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="76"
                  height="11"
                  viewBox="0 0 76 11"
                  fill="none"
                >
                  <path
                    d="M11.6791 3.93085L7.99003 3.41394L6.33697 0.181233C6.30128 0.125832 6.25139 0.0800961 6.19204 0.0483744C6.13269 0.0166527 6.06585 0 5.99788 0C5.92991 0 5.86307 0.0166527 5.80372 0.0483744C5.74437 0.0800961 5.69448 0.125832 5.65879 0.181233L4.00573 3.41394L0.316712 3.93085C0.249997 3.93796 0.186738 3.96298 0.134231 4.00303C0.0817235 4.04308 0.0421075 4.09653 0.0199523 4.15722C-0.00220282 4.2179 -0.00599452 4.28335 0.0090146 4.34601C0.0240237 4.40867 0.0572222 4.46599 0.104781 4.51136L2.78924 7.03231L2.15204 10.5979C2.14338 10.6634 2.15384 10.7299 2.18225 10.79C2.21066 10.8502 2.25592 10.9016 2.31299 10.9386C2.37007 10.9756 2.43673 10.9967 2.50558 10.9997C2.57444 11.0026 2.64279 10.9872 2.70306 10.9551L5.99788 9.28262L9.2927 10.9538C9.35297 10.9858 9.42132 11.0012 9.49018 10.9983C9.55903 10.9954 9.6257 10.9742 9.68277 10.9372C9.73985 10.9002 9.7851 10.8488 9.81351 10.7887C9.84192 10.7285 9.85238 10.662 9.84373 10.5965L9.21076 7.03366L11.8952 4.51271C11.9428 4.46735 11.976 4.41002 11.991 4.34736C12.006 4.2847 12.0022 4.21925 11.98 4.15857C11.9579 4.09788 11.9183 4.04443 11.8658 4.00438C11.8133 3.96433 11.75 3.93931 11.6833 3.93221L11.6791 3.93085Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M27.6791 3.93085L23.99 3.41394L22.337 0.181233C22.3013 0.125832 22.2514 0.0800961 22.192 0.0483744C22.1327 0.0166527 22.0658 0 21.9979 0C21.9299 0 21.8631 0.0166527 21.8037 0.0483744C21.7444 0.0800961 21.6945 0.125832 21.6588 0.181233L20.0057 3.41394L16.3167 3.93085C16.25 3.93796 16.1867 3.96298 16.1342 4.00303C16.0817 4.04308 16.0421 4.09653 16.02 4.15722C15.9978 4.2179 15.994 4.28335 16.009 4.34601C16.024 4.40867 16.0572 4.46599 16.1048 4.51136L18.7892 7.03231L18.152 10.5979C18.1434 10.6634 18.1538 10.7299 18.1823 10.79C18.2107 10.8502 18.2559 10.9016 18.313 10.9386C18.3701 10.9756 18.4367 10.9967 18.5056 10.9997C18.5744 11.0026 18.6428 10.9872 18.7031 10.9551L21.9979 9.28262L25.2927 10.9538C25.353 10.9858 25.4213 11.0012 25.4902 10.9983C25.559 10.9954 25.6257 10.9742 25.6828 10.9372C25.7398 10.9002 25.7851 10.8488 25.8135 10.7887C25.8419 10.7285 25.8524 10.662 25.8437 10.5965L25.2108 7.03366L27.8952 4.51271C27.9428 4.46735 27.976 4.41002 27.991 4.34736C28.006 4.2847 28.0022 4.21925 27.98 4.15857C27.9579 4.09788 27.9183 4.04443 27.8658 4.00438C27.8133 3.96433 27.75 3.93931 27.6833 3.93221L27.6791 3.93085Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M43.6791 3.93085L39.99 3.41394L38.337 0.181233C38.3013 0.125832 38.2514 0.0800961 38.192 0.0483744C38.1327 0.0166527 38.0658 0 37.9979 0C37.9299 0 37.8631 0.0166527 37.8037 0.0483744C37.7444 0.0800961 37.6945 0.125832 37.6588 0.181233L36.0057 3.41394L32.3167 3.93085C32.25 3.93796 32.1867 3.96298 32.1342 4.00303C32.0817 4.04308 32.0421 4.09653 32.02 4.15722C31.9978 4.2179 31.994 4.28335 32.009 4.34601C32.024 4.40867 32.0572 4.46599 32.1048 4.51136L34.7892 7.03231L34.152 10.5979C34.1434 10.6634 34.1538 10.7299 34.1823 10.79C34.2107 10.8502 34.2559 10.9016 34.313 10.9386C34.3701 10.9756 34.4367 10.9967 34.5056 10.9997C34.5744 11.0026 34.6428 10.9872 34.7031 10.9551L37.9979 9.28262L41.2927 10.9538C41.353 10.9858 41.4213 11.0012 41.4902 10.9983C41.559 10.9954 41.6257 10.9742 41.6828 10.9372C41.7398 10.9002 41.7851 10.8488 41.8135 10.7887C41.8419 10.7285 41.8524 10.662 41.8437 10.5965L41.2108 7.03366L43.8952 4.51271C43.9428 4.46735 43.976 4.41002 43.991 4.34736C44.006 4.2847 44.0022 4.21925 43.98 4.15857C43.9579 4.09788 43.9183 4.04443 43.8658 4.00438C43.8133 3.96433 43.75 3.93931 43.6833 3.93221L43.6791 3.93085Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M59.6791 3.93085L55.99 3.41394L54.337 0.181233C54.3013 0.125832 54.2514 0.0800961 54.192 0.0483744C54.1327 0.0166527 54.0658 0 53.9979 0C53.9299 0 53.8631 0.0166527 53.8037 0.0483744C53.7444 0.0800961 53.6945 0.125832 53.6588 0.181233L52.0057 3.41394L48.3167 3.93085C48.25 3.93796 48.1867 3.96298 48.1342 4.00303C48.0817 4.04308 48.0421 4.09653 48.02 4.15722C47.9978 4.2179 47.994 4.28335 48.009 4.34601C48.024 4.40867 48.0572 4.46599 48.1048 4.51136L50.7892 7.03231L50.152 10.5979C50.1434 10.6634 50.1538 10.7299 50.1823 10.79C50.2107 10.8502 50.2559 10.9016 50.313 10.9386C50.3701 10.9756 50.4367 10.9967 50.5056 10.9997C50.5744 11.0026 50.6428 10.9872 50.7031 10.9551L53.9979 9.28262L57.2927 10.9538C57.353 10.9858 57.4213 11.0012 57.4902 10.9983C57.559 10.9954 57.6257 10.9742 57.6828 10.9372C57.7398 10.9002 57.7851 10.8488 57.8135 10.7887C57.8419 10.7285 57.8524 10.662 57.8437 10.5965L57.2108 7.03366L59.8952 4.51271C59.9428 4.46735 59.976 4.41002 59.991 4.34736C60.006 4.2847 60.0022 4.21925 59.98 4.15857C59.9579 4.09788 59.9183 4.04443 59.8658 4.00438C59.8133 3.96433 59.75 3.93931 59.6833 3.93221L59.6791 3.93085Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M75.6791 3.93085L71.99 3.41394L70.337 0.181233C70.3013 0.125832 70.2514 0.0800961 70.192 0.0483744C70.1327 0.0166527 70.0658 0 69.9979 0C69.9299 0 69.8631 0.0166527 69.8037 0.0483744C69.7444 0.0800961 69.6945 0.125832 69.6588 0.181233L68.0057 3.41394L64.3167 3.93085C64.25 3.93796 64.1867 3.96298 64.1342 4.00303C64.0817 4.04308 64.0421 4.09653 64.02 4.15722C63.9978 4.2179 63.994 4.28335 64.009 4.34601C64.024 4.40867 64.0572 4.46599 64.1048 4.51136L66.7892 7.03231L66.152 10.5979C66.1434 10.6634 66.1538 10.7299 66.1823 10.79C66.2107 10.8502 66.2559 10.9016 66.313 10.9386C66.3701 10.9756 66.4367 10.9967 66.5056 10.9997C66.5744 11.0026 66.6428 10.9872 66.7031 10.9551L69.9979 9.28262L73.2927 10.9538C73.353 10.9858 73.4213 11.0012 73.4902 10.9983C73.559 10.9954 73.6257 10.9742 73.6828 10.9372C73.7398 10.9002 73.7851 10.8488 73.8135 10.7887C73.8419 10.7285 73.8524 10.662 73.8437 10.5965L73.2108 7.03366L75.8952 4.51271C75.9428 4.46735 75.976 4.41002 75.991 4.34736C76.006 4.2847 76.0022 4.21925 75.98 4.15857C75.9579 4.09788 75.9183 4.04443 75.8658 4.00438C75.8133 3.96433 75.75 3.93931 75.6833 3.93221L75.6791 3.93085Z"
                    fill="#FFC107"
                  />
                </svg>
                <span style={{ fontSize: "11px" }}>(1 Review)</span>
              </Stack>
              <p className="seller_desc">
                he whimsically named Egg Canvas is the design director and
                photographer in Seoul.
              </p>
              <Stack className="seller_social">
                <img
                  src="/icons/facebook_icon.svg"
                  style={{ marginRight: "10px" }}
                  alt=""
                />
                <img
                  src="/icons/twitter_icon.svg"
                  style={{ marginRight: "10px" }}
                />
                <img
                  src="/icons/youtube_icon.svg"
                  style={{ marginRight: "10px" }}
                />
                <img
                  src="/icons/insta_icon.svg"
                  style={{ marginRight: "10px" }}
                />
              </Stack>
              <Button variant="contained" color="primary" size="small">
                Contact with Dealer
              </Button>
            </Stack>
            <Stack className="car_location">
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div className="vertical_line"></div>
                <div className="line_near">Car Location</div>
              </Stack>
              <Box className="map_loc">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2089.7382483609517!2d127.72038899545637!3d34.96428111004859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2skr!4v1708086906249!5m2!1suz!2skr"
                  width="222"
                  height="235"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Stack>
            <Stack className="car_filtering">
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div className="vertical_line"></div>
                <div className="line_near">Search By Filter</div>
              </Stack>
              <StyledEngineProvider injectFirst>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Make</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={10}>BMW</MenuItem>
                    <MenuItem value={20}>Audi</MenuItem>
                    <MenuItem value={30}>KIA</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Transmission</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={1}>AutoMative</MenuItem>
                    <MenuItem value={2}>Manual</MenuItem>
                    
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Petrol Type</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={3}>Gasoline</MenuItem>
                    <MenuItem value={4}>Dizel</MenuItem>
                    <MenuItem value={5}>Gas</MenuItem>
                    <MenuItem value={6}>Hybrid</MenuItem>
                    <MenuItem value={7}>Electric</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Color</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={8}>White</MenuItem>
                    <MenuItem value={9}>Black</MenuItem>
                    <MenuItem value={11}>Red</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Year</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={12}>2024</MenuItem>
                    <MenuItem value={13}>2023</MenuItem>
                    <MenuItem value={14}>2022</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Body Type</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={15}>Sedan</MenuItem>
                    <MenuItem value={16}>SUV</MenuItem>
                    <MenuItem value={17}>CrossOver</MenuItem>
                  </Selects>
                </FormControl>
              </StyledEngineProvider>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div className="vertical_line"></div>
                <div className="line_near">By Price</div>
              </Stack>
              <Box sx={{ width: 250 }}>
      <Slider
        marks={marks}
        step={10}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handlePrice}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typographys
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          {MIN} min
        </Typographys>
        <Typographys
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          {MAX} max
        </Typographys>
      </Box>
    </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
