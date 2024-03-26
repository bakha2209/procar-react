import { Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Car } from "../../../types/car";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveChosenCar,
  retrieveChosenDealer,
} from "../DealerPage/selector";
import { createSelector } from "reselect";
import { Dealer } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenDealer, setChosenCar } from "../../screens/DealerPage/slice";
import { useEffect } from "react";
import CarApiService from "../../apiServices/carApiService";
import DealerApiService from "../../apiServices/dealerApiService";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setChosenCar: (data: Car) => dispach(setChosenCar(data)),
  setChosenDealer: (data: Dealer) => dispach(setChosenDealer(data)),
});
// REDUX SELECTOR
const chosenCarRetriever = createSelector(retrieveChosenCar, (chosenCar) => ({
  chosenCar,
}));
const chosenDealerRetriever = createSelector(
  retrieveChosenDealer,
  (chosenDealer) => ({
    chosenDealer,
  })
);

const order_list = Array.from(Array(5).keys());

export function ChosenCar(props:any) {
  /**INITIALIZATIONS */
  let { car_id } = useParams<{ car_id: string }>();
  const { setChosenCar, setChosenDealer } = actionDispatch(useDispatch());
  const { chosenCar } = useSelector(chosenCarRetriever);
  const { chosenDealer } = useSelector(chosenDealerRetriever);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const carRelatedProcess = async () => {
    try {
      const carService = new CarApiService();
      const car: Car = await carService.getChosenCar(car_id);
      setChosenCar(car);

      const dealerService = new DealerApiService();
      const dealer = await dealerService.getChosenDealer(car.dealer_mb_id);
      setChosenDealer(dealer);
    } catch (err) {
      console.log("carRelatedProcess, ERROR:", err);
    }
  };
  useEffect(() => {
    carRelatedProcess().then();
  }, [productRebuild]);

  /**HANDLERS */
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "car",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

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
              {chosenCar?.car_images.map((ele: string) => {
                const image_path = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide>
                    <img src={image_path} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          <Stack className="car_description">
            <Stack className="car_main_title">
              <h2 className="car_title">
                {chosenCar?.produced_year} {chosenCar?.car_brand}{" "}
                {chosenCar?.car_name} {chosenCar?.car_model}
              </h2>
              <div className="sale_off">-{chosenCar?.car_discount?? 0 > 0 ? chosenCar?.car_discount : null}%</div>
            </Stack>
            <Stack className="car_brand">
              <div className="car_toyota">Brand: {chosenCar?.car_brand}</div>
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
            <p className="car_para">{chosenCar?.car_description}</p>
            <p className="car_model">Model: {chosenCar?.car_model}</p>
            <Stack className="con_trans">
              <Box marginRight={"40px"}>
                <p>Condition</p>
                <div className="con_div">New</div>
              </Box>
              <Box>
                <p>Transmission</p>
                <div className="con_div">
                  {chosenCar?.car_transmission} Transmission
                </div>
              </Box>
            </Stack>
            <Stack className="car_price">
              <Stack className="price_old">
                <p>
                  $
                  {Math.round((chosenCar?.car_price ?? 0) - ((chosenCar?.car_price ?? 0) * ((chosenCar?.car_discount ?? 0) / 100)))}
{" "}
                  <span style={{ marginLeft: "10px" }}>${chosenCar?.car_price}</span>
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
              <span className="boston_address">Seoul, South Korea</span>
            </Stack>
          </Stack>
          <Stack className="car_overview">
            <h3>Car Overview</h3>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/small_car.svg" alt="" />
                  <p>
                    Body Type: <span>{chosenCar?.car_type}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/transmission.svg" alt="" />
                  <p>
                    Transmission: <span>{chosenCar?.car_transmission}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/date_range.svg" alt="" />
                  <p>
                    Year: <span>{chosenCar?.produced_year}</span>
                  </p>
                </Stack>
              </Box>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/color_fill.svg" alt="" />
                  <p>
                    Exterior Color: <span>{chosenCar?.car_color}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/fuel.svg" alt="" />
                  <p>
                    Fuel Type: <span>{chosenCar?.car_engine_type}</span>
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
                    Interior-Color: <span>N/A</span>
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
