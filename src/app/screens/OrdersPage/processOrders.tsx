import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
//REDUX
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { createSelector } from "reselect";
import { Order } from "../../../types/order";
import { Car } from "../../../types/car";
import { serverApi } from "../../lib/config";
import moment from "moment";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export default function ProcessOrders(props: any) {
  /**INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);

  /**HANDLERS */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm(
        "Do you confirm that you received your order?"
      );
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
  return (
    <TabPanel value={"2"}>
      <Stack height={"auto"} display={"flex"} flexDirection={"column"} width={"100%"}>
        {processOrders?.map((order) => {
          return (
            <React.Fragment key={order._id}>
              {order.order_items.map((item) => {
                const car: Car | undefined = order.car_data.find((ele) => ele._id === item.car_id);
                if (!car) return null; // Handle case where car is not found
                const image_path = car.car_images.length > 0 ? `${serverApi}/${car.car_images[0]}` : ""; // Check if car images exist
                return (
                  <Stack key={item.car_id} className="wish_box">
                    <img src={image_path} alt="" />
                    <Stack className="car_desc">
                      <Box height={"75px"}>
                        <span>Brand: {car?.car_brand}</span>
                        <div className="car_name">{car?.car_name} {car?.car_type} {car?.produced_year}</div>
                        <span className="car_price">${car?.car_price - (car?.car_price * car?.car_discount) / 100}</span>
                      </Box>
                      <Button
                        value={order._id}
                        onClick={finishOrderHandler}
                        variant="contained"
                        color="primary"
                        style={{
                          borderRadius: "15.5px",
                          height: "32px",
                          width: "104px",
                        }}
                      >
                        Approved
                      </Button>
                    </Stack>
                  </Stack>
                );
              })}
            </React.Fragment>
          );
        })}
      </Stack>
    </TabPanel>
  );
  
}
