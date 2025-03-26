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
const AddDeliveryPartner = () => {
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
                        Add Delivery Partner
                    </Typography>
                </Stack>

            </Stack>
        </Stack>
    )
}

export default AddDeliveryPartner;