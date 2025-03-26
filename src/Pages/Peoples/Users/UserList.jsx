import React, { useState, useEffect } from 'react';
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress,
    Stack,
    IconButton,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import BackButton from '../../../Components/BackButton';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const UserList = () => {
    const navigate = useNavigate();
    return (
        <Stack p={1}>
            <Stack
            mb={1}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <BackButton />
                    <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
                        Users
                    </Typography>
                </Stack>
                {/* <Button
                    onClick={(e) => navigate("/addDeliveryPartner")}
                    size="small"
                    sx={{ textTransform: "none" }}
                    startIcon={<AddIcon />}
                >
                    Add User
                </Button> */}
            </Stack>
            <TextField
                size="small"

                placeholder="Search by Name or Phone Number"


            />
        </Stack>
    )
}
export default UserList;