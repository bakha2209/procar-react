import React from "react";
import { Badge, Box, Button, IconButton, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { CartItem } from "../../../types/others";
import { serverApi } from "../../lib/config";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";

export default function Basket(props: any) {
  /** INITIALIZATIONS **/
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { cartItems, onAdd, onDelete } = props;
  const itemsPrice = cartItems?.reduce((a: any, c: CartItem) => a + c.price, 0);

  /** HANDLERS **/
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const processOrderHandler = async () => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={1} color="secondary">
          <AddShoppingCartIcon color="primary" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className="basket_frame">
          {false ? (
            <Box className="false_frame">
              <img src="/home/buy.png" alt="" />
              <div className="empty_desc">
                Empty cart. Let's fill it with some great finds!
              </div>
              <div className="empty_shop">Shop Now</div>
            </Box>
          ) : (
            <Box className="true_frame">
              <img src="/home/donut_small.png" alt="" className="donut_image" />
              <div className="wish_name">My Wishlist:</div>
              <Box className="orders_wrapper">
                {cartItems.map((item: CartItem) => {
                  const image_path = `${serverApi}/${item?.image}`;
                  return (
                    <Box className="basket_info_box">
                      <Stack flexDirection={"row"} sx={{ width: "100%" }}>
                        <img src={image_path} className="car_img" />
                        <Box
                          flexDirection={"column"}
                          sx={{ marginLeft: "10px" }}
                        >
                          <div className={"product_name"}>
                            {item?.brand} {item?.name} {item?.produced_year}
                          </div>
                          <span className="product_price">
                            <MonetizationOnIcon fontSize="small" />
                            {item?.price - (item?.price * item?.discount) / 100}
                          </span>
                        </Box>
                      </Stack>
                      <CancelIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(item)}
                      />
                    </Box>
                  );
                })}
              </Box>
              {cartItems?.length > 0 ? (
                <Box className={"to_order_box"}>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    sx={{ marginRight: "10px" }}
                  >
                    <span className={"price_text"}>Total Price Amount:</span>
                    <span style={{ fontWeight: "400" }}>${itemsPrice}</span>
                  </Stack>

                  <Button
                    onClick={processOrderHandler}
                    startIcon={<ShoppingCartCheckoutIcon />}
                    variant={"contained"}
                    className="purchase_btn"
                  >
                    Purchase Now
                  </Button>
                </Box>
              ) : (
                ""
              )}
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
