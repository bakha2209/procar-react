import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

const finishedOrders = Array.from(Array(3).keys());

export default function FinishedOrders(props: any) {
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order) => {
          return (
            <Stack className="wish_box">
              <img src="/home/super_car.jpg" alt="" />
              <Stack className="car_desc">
                <Box height={"75px"}>
                  <span>Brand: Volvo</span>
                  <div className="car_name">Chevrolet Suburban 2023</div>
                  <span className="car_price">$27000</span>
                </Box>
                
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </TabPanel>
  );
}