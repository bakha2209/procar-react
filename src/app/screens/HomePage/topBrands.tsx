import { Box, Container, Stack } from "@mui/material";
import React from "react";
import "../../../css/homepage.css";

const brand_list = Array.from(Array(6).keys());

export function TopBrands() {
  return (
    <div className="top_brand">
      <Container>
        <p style={{ marginTop: "15px" }} className="brand_red_text">
          FIND YOUR CAR BY CAR BRAND
        </p>
        <p className="brand_blue_text">browse by top brands</p>
        <Stack className="brand_stack">
          {brand_list.map((ele, index) => {
            return (
              <Box className="brand_box">
                <img src="/logos/acura.png" alt="" />
                <p>Acura</p>
              </Box>
            );
          })}
        </Stack>
        <Stack
          style={{
            width:"100%",
            height: "auto",
            flexDirection:"row",
            justifyContent:"center",
            marginTop: "40px",
          }}
        >
          <button className="brand_button">see all</button>
        </Stack>
      </Container>
    </div>
  );
}
