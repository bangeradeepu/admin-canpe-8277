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
import { Route, Routes, Link } from "react-router-dom";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import './App.css'
import Sidebar from "./Components/Sidebar";
import BarcodeScanner from "./Components/BarcodeScanner";
import AddBarcodeProduct from "./Pages/AddBarcodeProduct";

const App = () => {
  return (
    <div>
      {/* <BarcodeScanner /> */}
     {/* <Stack p={2} sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Stack direction="row" p={2} spacing={2} sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <Box>Dashboard</Box>
        <Box>Settings</Box>
      </Stack>

      <Stack direction="row" spacing={2} mt={2} sx={{ flexGrow: 1 }}>
        <Stack sx={{ p: 2, backgroundColor: "white", width: "14%", height: "82vh", borderRadius: 2 }}>
          <Box>Home</Box>
          <Box>Add Product</Box>
        </Stack>

        <Stack
          sx={{
            width: "86%",
            backgroundColor: "white",
            borderRadius: 2,
            overflowY: "auto",
            p: 2,
            maxHeight: "82vh",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, consequuntur.
        </Stack>
      </Stack>
    </Stack> */}
      <Stack p={2}>
       <Stack direction={'row'} spacing={2}>
       <Link to="/">Add Product</Link>
       <Link to="/barcodeProduct">Add Barcode Product</Link>
       <Link to="/productList">Product List</Link>
       </Stack>

        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/barcodeProduct" element={<AddBarcodeProduct />} />
        </Routes>
      </Stack>
    </div>
  );
};

export default App;
