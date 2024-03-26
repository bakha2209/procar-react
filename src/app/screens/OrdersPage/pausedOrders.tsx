import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
//REDUX
import { useSelector } from "react-redux";
import {
  retrievePausedOrders,
} from "../../screens/OrdersPage/selector";
import { createSelector } from "reselect";
import { Dealer } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import { useHistory, useParams } from "react-router-dom";

// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

const pausedOrders = Array.from(Array(3).keys());

export default function PausedOrders(props: any) {
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order) => {
          return (
            <Stack className="wish_box">
              <img src="/home/super_car.jpg" alt="" />
              <Stack className="car_desc">
                <Box height={"75px"}>
                  <span>Brand: Volvo</span>
                  <div className="car_name">Chevrolet Suburban 2023</div>
                  <span className="car_price">$27000</span>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    borderRadius: "15.5px",
                    height:"32px",
                    width:"104px"
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  style={{
                    borderRadius: "15.5px",
                    background: "#47A13F",
                    height:"32px",
                    width:"104px"
                  }}
                >
                  Payment
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
