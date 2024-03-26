import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
//REDUX
import { useSelector } from "react-redux";
import {
  retrieveProcessOrders,
} from "../../screens/OrdersPage/selector";
import { createSelector } from "reselect";

// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

const processOrders = Array.from(Array(3).keys());

export default function ProcessOrders(props: any) {
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order) => {
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
                  color="primary"
                  style={{
                    borderRadius: "15.5px",
                    
                    height:"32px",
                    width:"104px"
                  }}
                >
                  Approved
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </TabPanel>
  );
}