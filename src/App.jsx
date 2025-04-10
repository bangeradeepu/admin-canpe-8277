import {
  Stack,
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Dialog,
  Menu,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";

import React, { useState } from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AddProduct from "./Pages/Products/AddProduct";
import ProductList from "./Pages/Products/ProductList";
import "./App.css";
import AddBarcodeProduct from "./Pages/Products/AddBarcodeProduct";
import Category from "./Pages/Category/Category";
import SideNavigation from "./Components/SideNavigation";
import TopNavigation from "./Components/TopNavigation";
import useMediaQuery from '@mui/material/useMediaQuery';
import Warehouse from "./Pages/Warehouse/Warehouse";
import Units from "./Pages/Units/Units";
import MapSettings from "./Pages/PosSettings/MapSettings";
import Broadcast from "./Pages/PosSettings/Broadcast";
import StatusIndicator from "./Components/StatusIndicator";
import ViewProduct from "./Pages/Products/ViewProduct";
import EditProduct from "./Pages/Products/EditProduct";
import QuantityAdjustment from "./Pages/Products/QuantityAdjustment";
import LiveOrders from "./Pages/Orders/LiveOrders";
import DeliveryPartnersList from "./Pages/Peoples/DeliveryPartner/DeliveryPartnersList";
import AddDeliveryPartner from "./Pages/Peoples/DeliveryPartner/AddDeliveryPartner";
import UserList from "./Pages/Peoples/Users/UserList";
const App = () => {
  const matches = useMediaQuery('(min-width:600px)');
  
  return (
    <div>
      {/* <BarcodeScanner /> */}
      <Stack p={2} sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
        <TopNavigation />

        <Stack direction="row" spacing={2} mt={2} sx={{ flexGrow: 1 }}>
          {matches && ( 
        <SideNavigation />
          )}
          <Stack
            sx={{
              width: matches ? "60%" : "100%",
              backgroundColor: "white",
              borderRadius: 2,
              p: 1,
              maxHeight: "82vh",
              border:1,
              borderColor:'#dadada'
            }}
          >
            <Stack sx={{overflowY:'auto',p:1}}>

            
            <Routes>
              <Route path="/" element={<AddProduct />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/barcodeProduct" element={<AddBarcodeProduct />} />
              <Route path="/category" element={<Category />} />
              <Route path="/warehouse" element={<Warehouse />} />
              <Route path="/navigation" element={<SideNavigation />} />
              <Route path="/units" element={<Units />} />
              <Route path="/mapSetting" element={<MapSettings />} />
              <Route path="/broadcast" element={<Broadcast />} />
              <Route path="/viewProduct/:id" element={<ViewProduct />} />
              <Route path="/editProduct/:id" element={<EditProduct />} />
              <Route path="/quantityAdjustment" element={<QuantityAdjustment />} />
              <Route path="/liveOrder" element={<LiveOrders />} />
              <Route path="/deliveryPartners" element={<DeliveryPartnersList />} />
              <Route path="/addDeliveryPartner" element={<AddDeliveryPartner />} />
              <Route path="/users" element={<UserList />} />

            </Routes>
            </Stack>
          </Stack>
          {matches && ( 
        <StatusIndicator />  
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default App;
