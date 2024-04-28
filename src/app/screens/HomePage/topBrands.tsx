import { Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../css/homepage.css";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setTargetCars } from "../DealerPage/slice";
import { retrieveTargetCars } from "../DealerPage/selector";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarSearchObj } from "../../../types/others";
import CarApiService from "../../apiServices/carApiService";
import { Car } from "../../../types/car";
import { CategoryCont } from "../context/Category";
import { setByCategories } from "./slice";
import { retrieveByCategories } from "./selector";
import{carData} from "../../components/brands&&car_types"




// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetCars: (data: Car[]) => dispach(setTargetCars(data)),
});

// REDUX SELECTOR
const TargetCarsRetriever = createSelector(
  retrieveByCategories,
  (targetCars) => ({
    targetCars,
  })
);

const brand_list = Array.from(Array(6).keys());

export function TopBrands(props: any) {
  /**INITIALIZATIONS */
  // const [category, setCategory] = CategoryCont();
  const [make, setMake] = React.useState("");
  const { targetCars } = useSelector(TargetCarsRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<CarSearchObj>({
    page: 1,
    limit: 5,
    order: "createdAt",
    car_brand: "KIA",
  });
  const [carRebuild, setCarRebuild] = useState<Date>(new Date());
  // useEffect(() => {
  //   const carService = new CarApiService();
  //   carService
  //     .getTargetCars(targetSearchObject)
  //     .then((data) => setTargetCars(data))
  //     .catch((err) => console.log(err));
  // }, [targetSearchObject, carRebuild]);
  

  const history = useHistory();

  const [showTopBrands, setShowTopBrands] = useState(true);

  const toggleView = () => {
    setShowTopBrands(!showTopBrands);
  };
  /**HANDLERS */
  const searchHandler_make = (value: string) => {
    // console.log("selected brand", value)
    //targetSearchObject.page = 1;
    //targetSearchObject.car_brand = value;

    // // setMake(value);
    // // history.push("/dealer/cars")
    // // setTargetSearchObject({ ...targetSearchObject });
    // // Update the targetSearchObject with the selected brand
    const updatedSearchObject: CarSearchObj = {
        ...targetSearchObject,
        page: 1, // Reset page to 1 when a new brand is selected
        car_brand: value,
     };
    // console.log("Updated search object:", updatedSearchObject);
    // // Update the state with the new targetSearchObject
     setTargetSearchObject((prevSearchObject) => ({
        ...prevSearchObject,
        ...updatedSearchObject,
      }));
    // console.log("Updated targetSearchObject state:", targetSearchObject);
    // // Navigate to the "/dealer/cars" page with the selected brand as a query parameter
    //history.push(`/dealer/cars`);

    //setTargetSearchObject({ ...targetSearchObject });
  };

  const searchTypeHandler = (type: string) => {
    history.push(`/dealer/cars`);
    window.scrollTo(0, 0);
    targetSearchObject.page = 1;
    targetSearchObject.car_brand = type;
    setTargetSearchObject({ ...targetSearchObject });
  };

  return (
    <div className="top_brand">
      <Container>
        <p style={{ marginTop: "15px" }} className="brand_red_text">
          FIND YOUR CAR BY CAR BRAND
        </p>
        <p className="brand_blue_text">browse by top brands</p>
        {showTopBrands ? (
          <Stack className="brand_stack">
            <Box className="model_inc">
              {carData.slice(0, 5).map((ele, index) => {
                return (
                  <Box
                    className="brand_box"
                    onClick={() => {
                      searchTypeHandler(ele.model);
                      
                    }}
                  >
                    <img src={`${ele.image}`} alt="" />
                    <p>{ele.model}</p>
                  </Box>
                );
              })}
            </Box>

            <Stack
              style={{
                width: "100%",
                height: "auto",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <button className="brand_button" onClick={toggleView}>
                see more
              </button>
            </Stack>
          </Stack>
        ) : (
          <Stack className="brand_stack">
            <Box className="model_inc" flexWrap={"wrap"}>
              {carData.map((ele) => {
                return (
                  <Box className="brand_box" onClick={() => {
                    searchTypeHandler(ele.model);
                    
                  }}>
                    <img src={`${ele.image}`} alt="" />
                    <p>{ele.model}</p>
                  </Box>
                );
              })}
            </Box>

            <Stack
              style={{
                width: "100%",
                height: "auto",
                flexDirection: "row",
                justifyContent: "center",

                marginTop: "40px",
              }}
            >
              <button className="brand_button" onClick={toggleView}>
                see top models
              </button>
            </Stack>
          </Stack>
        )}
      </Container>
    </div>
  );
}
