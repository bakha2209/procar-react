import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import "../../../css/homepage.css";

interface Car {
  image: string;
  model: string;
}

const carData: Car[] = [
  { model: "BMW", image: "/logos/1.png" },
  { model: "AUDI", image: "/logos/2.jpg" },
  { model: "FORD", image: "/logos/3.png" },
  { model: "MERCEDES-BENZ", image: "/logos/4.jpg" },
  { model: "KIA", image: "/logos/5.png" },
  { model: "HYUNDAI", image: "/logos/6.png" },
  { model: "SAMSUNG", image: "/logos/7.jpg" },
  { model: "VOLVO", image: "/logos/8.jpg" },
  { model: "DAF", image: "/logos/9.png" },
  { model: "MAN", image: "/logos/10.jpg" },
  { model: "CHEVROLET", image: "/logos/11.jpg" },
];

const brand_list = Array.from(Array(6).keys());

export function TopBrands() {
  const [showTopBrands, setShowTopBrands] = useState(true);

  const toggleView = () => {
    setShowTopBrands(!showTopBrands);
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
                  <Box className="brand_box">
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
                  <Box className="brand_box">
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
