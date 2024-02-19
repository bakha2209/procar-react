import { Container, Stack } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const order_list = Array.from(Array(5).keys());

export function ChosenCar() {
  const [value, setValue] = React.useState<number | null>(4);
  return (
    <div className="chosen_car">
      <Container>
        <Stack className="main_car">
          <Box className="swiper_box">
            <Swiper
              slidesPerView={1}
              centeredSlides={false}
              slidesPerGroupSkip={1}
              grabCursor={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
              }}
              scrollbar={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Keyboard, Scrollbar, Navigation, Pagination]}
              className="mySwiper"
            >
              {order_list.map((ele) => {
                return (
                  <SwiperSlide>
                    <img src="/home/super_car.jpg" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          <Stack className="car_description">
            <Stack className="car_main_title">
              <h2 className="car_title">2007 FORD MUSTANG DELUXE</h2>
              <div className="sale_off">-34%</div>
            </Stack>
            <Stack className="car_brand">
              <div className="car_toyota">Brand: Toyota</div>
              <Stack flexDirection={"row"}>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span>(2reviews)</span>
              </Stack>
            </Stack>
            <p className="car_para">
              There are many variations of passages of Lorem Ipsum available,
              but majority have suffered teration in some form, by injected
              humour, or randomised words which don't look even slight
              believable. If you are going to use a passa There are many
              variations of passages of Lorem Ipsum available, but majority have
              suffered teration in some form, by injected humour, or randomised
            </p>
            <p className="car_model">
              Model: Flores 3-Lite-Diamond 8/0 E-01-1SL
            </p>
            <Stack className="con_trans">
              <Box marginRight={"40px"}>
                <p>Condition</p>
                <div className="con_div">Used</div>
              </Box>
              <Box>
                <p>Transmission</p>
                <div className="con_div">Automatic Transmission</div>
              </Box>
            </Stack>
            <Stack className="car_price">
              <Stack className="price_old">
                <p>
                  $46000 <span style={{ marginLeft: "10px" }}>$49000</span>
                </p>
              </Stack>
              <Stack flexDirection={"row"}>
                <div className="otzivlar"></div>
                <div className="otzivlar"></div>
                <div className="otzivlar"></div>
              </Stack>
            </Stack>
            <Stack flexDirection={"row"} style={{ marginBottom: "80px" }}>
              <img src="/icons/location.svg" alt="" />
              <span className="boston_address">Boston, MA, United States</span>
            </Stack>
          </Stack>
          <Stack className="car_overview">
            <h3>Car Overview</h3>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/small_car.svg" alt="" />
                  <p>
                    Body Type: <span>Sedan</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/transmission.svg" alt="" />
                  <p>
                    Transmission: <span>Auto</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/date_range.svg" alt="" />
                  <p>
                    Year: <span>2021</span>
                  </p>
                </Stack>
              </Box>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/color_fill.svg" alt="" />
                  <p>
                    Exterior Color: <span>Red</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/fuel.svg" alt="" />
                  <p>
                    Fuel Type: <span>Gasoline</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/cylinder.svg" alt="" />
                  <p>
                    Cylinder: <span>N/A</span>
                  </p>
                </Stack>
              </Box>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/color_fill.svg" alt="" />
                  <p>
                    Interior-Color: <span>Red</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/reset_1.svg" alt="" />
                  <p>
                    History: <span>N/A</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/engine.svg" alt="" />
                  <p>
                    Engine: <span>N/A</span>
                  </p>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <Stack className="car_features">
            <h3>Car Features</h3>
            <Stack className="feature_line">
              <Box flexDirection={"column"}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Central locking</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Leather</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Sports package</p>
                </Stack>
              </Box>
              <Box flexDirection={"column"}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Airbag: Driver</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Cruise Control</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Navigation system</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Airbag: Driver</p>
                </Stack>
              </Box>
              <Box flexDirection={"column"}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
              </Box>
              <Box flexDirection={"column"}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <h3>Car Location</h3>
          <Box className="location_car">
          <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2089.7382483609517!2d127.72038899545637!3d34.96428111004859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2skr!4v1708086906249!5m2!1suz!2skr"
                  width="100%"
                  height="490"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
