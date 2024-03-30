import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
//REDUX
import { useSelector } from "react-redux";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { createSelector } from "reselect";
import { Dealer } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import { useHistory, useParams } from "react-router-dom";
import { Car } from "../../../types/car";
import { Order } from "../../../types/order";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";

// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);



export default function PausedOrders(props: any) {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /**HANDLERS */
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm("Do you want to cancel the order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm("Do you want to process the payment?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Stack key={order._id} className="wish_box">
              {order.order_items.map((item) => {
                const car: Car | undefined = order.car_data.find((ele) => ele._id === item.car_id);
                if (!car) return null; // Handle case where car is not found
                const image_path = car.car_images.length > 0 ? `${serverApi}/${car.car_images[0]}` : ""; // Check if car images exist
                return (
                  <React.Fragment key={item.car_id}>
                    <img src={image_path} alt="" />
                    <Stack className="car_desc">
                      <Box height={"75px"}>
                        <span>Brand: {car?.car_brand}</span>
                        <div className="car_name">
                          {car?.car_name} {car?.car_type} {car?.produced_year}
                        </div>
                        <span className="car_price">
                          ${car?.car_price - (car?.car_price * car?.car_discount) / 100}
                        </span>
                      </Box>
                      <Button
                        value={order._id}
                        onClick={deleteOrderHandler}
                        variant="contained"
                        color="secondary"
                        style={{
                          borderRadius: "15.5px",
                          height: "32px",
                          width: "104px",
                        }}
                      >
                        Cancel
                      </Button>
  
                      <Button
                        value={order._id}
                        onClick={processOrderHandler}
                        variant="contained"
                        style={{
                          borderRadius: "15.5px",
                          background: "#47A13F",
                          height: "32px",
                          width: "104px",
                        }}
                      >
                        Payment
                      </Button>
                    </Stack>
                  </React.Fragment>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </TabPanel>
  );
  
}
