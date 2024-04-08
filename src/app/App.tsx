import React, { useEffect, useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DealerPage } from "./screens/DealerPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/header";
import { NavbarDealer } from "./components/header/dealer";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";
import AuthenticationModal from "./components/auth";
import { Member } from "../types/user";
import { serverApi } from "./lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "./lib/sweetAlert";
import { Definer } from "./lib/Definer";
import MemberApiService from "./apiServices/memberApiService";
import "../app/apiServices/verify";
import { CartItem } from "../types/others";
import { Car } from "../types/car";
import {CommunityChats} from "./components/communityChats";


function App() {
  /**INITIALIZATION */
  
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

 

  /** HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);

  const handleSignUpClose = () => setSignUpOpen(false);

  const handleLoginOpen = () => setLoginOpen(true);

  const handleLoginClose = () => setLoginOpen(false);
  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (car: Car) => {
    const exist: any = cartItems?.find(
      (item: CartItem) => item._id === car._id
    );
    if (exist) {
      alert("The item is already in your basket");
    } else {
      const new_item: CartItem = {
        _id: car._id,
        quantity: 1,
        name: car.car_name,
        price: car.car_price,
        image: car.car_images[0],
        brand: car.car_brand,
        discount: car.car_discount,
        produced_year: car.produced_year,
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      window.scrollBy({
        top: -1200,
        behavior: "smooth",
      });
    }
  };

  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          anchorEl={anchorEl}
          open={open}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : main_path.includes("/dealer") ? (
        <NavbarDealer
          setPath={setPath}
          anchorEl={anchorEl}
          open={open}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          anchorEl={anchorEl}
          open={open}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      )}

      <Switch>
        <Route path="/dealer">
          <DealerPage onAdd={onAdd} />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage
            orderRebuild={orderRebuild}
            setOrderRebuild={setOrderRebuild}
            
          />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      
      <Footer />
      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
      />
      <CommunityChats/>
    </Router>
    
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
