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
import SensorsIcon from '@mui/icons-material/Sensors';
import CheckIcon from '@mui/icons-material/Check';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import BroadcastOnHomeOutlinedIcon from '@mui/icons-material/BroadcastOnHomeOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router-dom";



const SideNavigation = () => {
  const matches = useMediaQuery('(min-width:600px)');
  const location = useLocation();
  const isNavigationPage = location.pathname === "/navigation";
  return (


    <Stack
      sx={{
        p: !isNavigationPage ? 2 : 'none',
        backgroundColor: "white",
        width: isNavigationPage ? "100%" : "20%",
        height: "82vh",
        borderRadius: 2,
        fontSize: isNavigationPage ? 16 : 14,
        border: !isNavigationPage ? 1 : 'none',
        borderColor: '#dadada',
        overflowY:'auto'
      }}
    >
      <Typography sx={{ fontSize: 12 }}>Orders</Typography>
      <NavLink
        to="/liveOrder"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "red" : "red",
          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <SensorsIcon sx={{ fontSize: 18,color:'red' }} />
          <Box>Live Orders</Box>
        </Stack>
      </NavLink>
      <NavLink
        to="/completedOrders"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",
          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <CheckIcon sx={{ fontSize: 18 }} />
          <Box>Completed Orders</Box>
        </Stack>
      </NavLink>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography sx={{ fontSize: 12 }}>Products</Typography>
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
          <AddOutlinedIcon sx={{ fontSize: 18 }} />
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
          <SubjectOutlinedIcon sx={{ fontSize: 18 }} />
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
          <CropFreeOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Add Barcode Product</Box>
        </Stack>
      </NavLink>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography sx={{ fontSize: 12 }}>Key Data</Typography>
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
          <CategoryOutlinedIcon sx={{ fontSize: 18 }} />
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
          <WarehouseOutlinedIcon sx={{ fontSize: 18 }} />
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
          <VaccinesOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Units</Box>
        </Stack>
      </NavLink>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography sx={{ fontSize: 12 }}>Peoples</Typography>
      <NavLink
        to="/users"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",

          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Users</Box>
        </Stack>
      </NavLink>
      <NavLink
        to="/deliveryPartners"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",

          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <SportsMotorsportsOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Delivry Partners</Box>
        </Stack>
      </NavLink>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography sx={{ fontSize: 12 }}>POS Settings</Typography>
      <NavLink
        to="/mapSetting"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",

          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <MapOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Map Settings</Box>
        </Stack>
      </NavLink>
      <NavLink
        to="/broadcast"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",

          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <BroadcastOnHomeOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Broadcast</Box>
        </Stack>
      </NavLink>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography sx={{ fontSize: 12 }}>Account</Typography>
      <NavLink
        to="/accountSetting"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",

          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <InsertEmoticonOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Account Settings</Box>
        </Stack>
      </NavLink>
      <NavLink
        to="/logout"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000000" : "#aeaeae",

          padding: "10px 0",
          display: "block",
        })}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <PowerSettingsNewOutlinedIcon sx={{ fontSize: 18 }} />
          <Box>Logout</Box>
        </Stack>
      </NavLink>
    </Stack>




  )
}
export default SideNavigation