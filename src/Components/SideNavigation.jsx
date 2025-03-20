import React, { useState } from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
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

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';

import useMediaQuery from '@mui/material/useMediaQuery';
  

  const SideNavigation = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return(
  
  
      <Stack
        sx={{
          p: 2,
          backgroundColor: "white",
          width: "20%",
          height: "82vh",
          borderRadius: 2,
          fontSize: 14,
          border:1,
          borderColor:'#dadada'
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
           <Stack direction="row" alignItems="center" spacing={0.5}>
            <AddOutlinedIcon sx={{fontSize:18}} />
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
           <Stack direction="row" alignItems="center" spacing={0.5}>
            <SubjectOutlinedIcon sx={{fontSize:18}} />
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
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CropFreeOutlinedIcon sx={{fontSize:18}} />
            <Box>Add Barcode Product</Box>
          </Stack>
        </NavLink>
        <Divider sx={{mt:1,mb:1}} />
        <Typography sx={{fontSize:12}}>Key Data</Typography>
        <NavLink
          to="/category"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#000000" : "#aeaeae",

            padding: "10px 0",
            display: "block",
          })}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CategoryOutlinedIcon sx={{fontSize:18}} />
            <Box>Category</Box>
          </Stack>
        </NavLink>
        <NavLink
          to="/warehouse"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#000000" : "#aeaeae",

            padding: "10px 0",
            display: "block",
          })}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <WarehouseOutlinedIcon sx={{fontSize:18}} />
            <Box>Warehouse</Box>
          </Stack>
        </NavLink>
        <NavLink
          to="/warehouse"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#000000" : "#aeaeae",

            padding: "10px 0",
            display: "block",
          })}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <VaccinesOutlinedIcon sx={{fontSize:18}} />
            <Box>Units</Box>
          </Stack>
        </NavLink>
      </Stack>
    
    
       

    )
  }
  export default SideNavigation