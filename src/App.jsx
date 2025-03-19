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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import axios from "axios";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import BarcodeScanner from "./Components/BarcodeScanner";
import AddBarcodeProduct from "./Pages/AddBarcodeProduct";
import Category from "./Pages/Category/Category";
import {
  Settings,
  ScanBarcode,
  CirclePlus,
  AlignLeft,
  ChartBarStacked,
  Power,
} from "lucide-react";

const App = () => {
  return (
    <div>
      {/* <BarcodeScanner /> */}
      <Stack p={2} sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          p={2}
          spacing={2}
          sx={{ backgroundColor: "white", borderRadius: 2 }}
        >
          <Typography sx={{ color: "red" }}>Canpe Admin</Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Settings />
            <Power />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} mt={2} sx={{ flexGrow: 1 }}>
          <Stack
            sx={{
              p: 2,
              backgroundColor: "white",
              width: "20%",
              height: "82vh",
              borderRadius: 2,
              fontSize: 14,
            }}
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#000000" : "#aeaeae",
                padding: "10px 0",
                display: "block",
              })}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CirclePlus fontSize="small" />
                <Box>Add Product</Box>
              </Stack>
            </NavLink>
            <NavLink
              to="/productList"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#000000" : "#aeaeae",

                padding: "10px 0",
                display: "block",
              })}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AlignLeft fontSize="small" />
                <Box>Product List</Box>
              </Stack>
            </NavLink>
            <NavLink
              to="/barcodeProduct"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#000000" : "#aeaeae",

                padding: "10px 0",
                display: "block",
              })}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <ScanBarcode fontSize="small" />
                <Box>Add Barcode Product</Box>
              </Stack>
            </NavLink>
           
            <NavLink
              to="/category"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#000000" : "#aeaeae",

                padding: "10px 0",
                display: "block",
              })}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <ChartBarStacked fontSize="small" />
                <Box>Category</Box>
              </Stack>
            </NavLink>
          </Stack>

          <Stack
            sx={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 2,
              overflowY: "auto",
              p: 2,
              maxHeight: "82vh",
            }}
          >
            <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/barcodeProduct" element={<AddBarcodeProduct />} />
          <Route path="/category" element={<Category />} />
        </Routes>
          </Stack>
        </Stack>
      </Stack>
      {/* <Stack p={2}>
       <Stack direction={'row'} spacing={2}>
       <Link to="/">Add Product</Link>
       <Link to="/barcodeProduct">Add Barcode Product</Link>
       <Link to="/productList">Product List</Link>
       <Link to="/category">Category</Link>
       </Stack>

        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/barcodeProduct" element={<AddBarcodeProduct />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </Stack> */}
    </div>
  );
};

export default App;
