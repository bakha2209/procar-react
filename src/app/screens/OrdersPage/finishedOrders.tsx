import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
//REDUX
import { useSelector } from "react-redux";
import {
  retrieveFinishedOrders,
} from "../../screens/OrdersPage/selector";
import { createSelector } from "reselect";
import { Order } from "../../../types/order";
import { Car } from "../../../types/car";
import { serverApi } from "../../lib/config";

// REDUX SELECTOR
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);



export default function FinishedOrders(props: any) {
   /**INITIALIZATIONS */
   const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order:Order) => {
          return (
            <React.Fragment key={order._id}>
              {order.order_items.map((item)=> {
                const car: Car | undefined = order.car_data.find((ele) => ele._id === item.car_id);
                if (!car) return null; // Handle case where car is not found
                const image_path = car.car_images.length > 0 ? `${serverApi}/${car.car_images[0]}` : "";
                return (
                  <Stack key={item.car_id} className="wish_box">
              <img src={image_path} alt="" />
              <Stack className="car_desc">
                <Box height={"75px"}>
                  <span>Brand: {car?.car_brand}</span>
                  <div className="car_name">{car?.car_name} {car?.car_type} {car?.produced_year}</div>
                  <span className="car_price">${car?.car_price - (car?.car_price * car?.car_discount) / 100}</span>
                </Box>
                
              </Stack>
            </Stack>
                )
              })}
            </React.Fragment>
            
          );
        })}
      </Stack>
    </TabPanel>
  );
}