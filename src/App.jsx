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
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import "./App.css";
import AddBarcodeProduct from "./Pages/AddBarcodeProduct";
import Category from "./Pages/Category/Category";
import SideNavigation from "./Components/SideNavigation";
import TopNavigation from "./Components/TopNavigation";
import useMediaQuery from '@mui/material/useMediaQuery';
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
              width: matches ? "80%" : "100%",
              backgroundColor: "white",
              borderRadius: 2,
              overflowY: "auto",
              p: 2,
              maxHeight: "82vh",
              border:1,
              borderColor:'#dadada'
            }}
          >
            <Routes>
              <Route path="/" element={<AddProduct />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/barcodeProduct" element={<AddBarcodeProduct />} />
              <Route path="/category" element={<Category />} />
              <Route path="/warehouse" element={<Category />} />
              <Route path="/navigation" element={<SideNavigation />} />
            </Routes>
          </Stack>
          
        </Stack>
      </Stack>
    </div>
  );
};

export default App;
