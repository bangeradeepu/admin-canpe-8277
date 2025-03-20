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
  import {
    Settings,
    ScanBarcode,
    CirclePlus,
    AlignLeft,
    ChartBarStacked,
    Power,
  } from "lucide-react";

  const TopNavigation = () => {
    return(
        <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
        spacing={2}
        sx={{ backgroundColor: "white", borderRadius: 2,border:1,borderColor:'#dadada' }}
      >
        <Typography sx={{ color: "black" }}>admin</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Settings />
          <Power />
        </Stack>
      </Stack>
    )
  }
  export default TopNavigation