import React, { useState } from 'react';
import '../css/App.css';
import "../css/navbar.css";
import "../css/footer.css"
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DealerPage } from './screens/DealerPage';
import { CommunityPage } from './screens/CommunityPage';
import { OrdersPage } from './screens/OrdersPage';
import { MemberPage } from './screens/MemberPage';
import { HelpPage } from './screens/HelpPage';
import { LoginPage } from './screens/LoginPage';
import { HomePage } from './screens/HomePage';
import { NavbarHome } from "./components/header";
import { NavbarDealer } from "./components/header/dealer";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";



function App() {
  const [path, setPath] = useState()
  const main_path = window.location.pathname;
  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome setPath={setPath}/>
      ) : main_path.includes("/dealer") ? (
        <NavbarDealer setPath={setPath}/>
      ) : (
        <NavbarOthers setPath={setPath}/>
      )}
       

        <Switch>
        <Route path="/dealer">
            <DealerPage />
          </Route>
          <Route path="/community">
            <CommunityPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
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
        <Footer/>
      
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
