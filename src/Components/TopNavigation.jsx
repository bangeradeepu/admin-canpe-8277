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
  Switch,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import BroadcastOnHomeOutlinedIcon from "@mui/icons-material/BroadcastOnHomeOutlined";

import useMediaQuery from "@mui/material/useMediaQuery";

import { useNavigate } from "react-router-dom";

const TopNavigation = () => {
  
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/navigation"); // Navigates to the "/home" route
  };
  const goToAddProduct = () => {
    navigate("/barcodeProduct");
  };
  const goToProductList = () => {
    navigate("/productList");
  };
  const goToAccount = () => {
    navigate("/account");
  };
  const goToBroadcast = () => {
    navigate("/broadcast");
  };
  return (
    <div>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        pl={2}
        pr={2}
        pb={2}
        pt={2}
        spacing={2}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          border: 1,
          borderColor: "#dadada",
        }}
      >
        <Typography sx={{ color: "black" }}>admin</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          {matches && (
            <Divider orientation="vertical" variant="middle" flexItem />
          )}

          <Switch defaultChecked size="small" color="success" />
          <IconButton onClick={goToBroadcast}>
            <BroadcastOnHomeOutlinedIcon
              sx={{ fontSize: 18, color: "#2e2e2e" }}
            />
          </IconButton>
          <IconButton onClick={goToProductList}>
            <InventoryOutlinedIcon
              onClick={goToProductList}
              sx={{ fontSize: 18, color: "#2e2e2e" }}
            />
          </IconButton>

          <IconButton onClick={goToAddProduct}>
            <QrCodeScannerOutlinedIcon
              onClick={goToAddProduct}
              sx={{ fontSize: 18, color: "#2e2e2e" }}
            />
          </IconButton>

          {!matches && (
            <IconButton onClick={goToHome}>
              <MenuIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
          {matches && (
            <Divider orientation="vertical" variant="middle" flexItem />
          )}
          {matches && (
            <Avatar
              onClick={goToAccount}
              sx={{ width: 30, height: 30 }}
              alt="Cindy Baker"
              src="https://images.freeimages.com/clg/istock/previews/1026/102672691-animal-emotion-avatar-vector-icon.jpg"
            />
          )}
        </Stack>
      </Stack>
    </div>
  );
};
export default TopNavigation;
