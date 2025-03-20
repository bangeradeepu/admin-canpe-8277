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

  import MenuIcon from '@mui/icons-material/Menu';

  import useMediaQuery from '@mui/material/useMediaQuery';


  const TopNavigation = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return(
      <div>
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
          <MenuIcon />
        </Stack>
      </Stack>
      </div>
     
    )
  }
  export default TopNavigation