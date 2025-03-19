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

const App = () => {
  return (
    <div>
      <Stack p={2}>
       <Stack direction={'row'} spacing={2}>
       <Link to="/">Add Product</Link>
       <Link to="/productList">Product List</Link>
       </Stack>

        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
      </Stack>
    </div>
  );
};

export default App;
