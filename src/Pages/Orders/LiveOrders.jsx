import React, { useState, useEffect } from "react";
import { IconButton, TextField, Button, Stack, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import BackButton from "../../Components/BackButton";
import AdjustIcon from '@mui/icons-material/Adjust';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const LiveOrders = () => {
    const items = [
        { no: 1, name: "Apple with Orange and Papaya", quantity: 10 },
        { no: 2, name: "Banana", quantity: 5 },
        { no: 3, name: "Orange", quantity: 8 },
        { no: 4, name: "Mango", quantity: 12 },
        { no: 5, name: "Grapes", quantity: 15 },
        { no: 6, name: "Orange", quantity: 15 },
        { no: 7, name: "Pineapple", quantity: 15 }
    ];
    return (
        <Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={1}>
                <Stack direction={'row'} alignItems={'center'} spacing={1} mb={1}>
                    <BackButton />
                   <Stack direction={'row'} spacing={1} alignItems={'center'}>
                   <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
                        Live Orders
                    </Typography>
                    <div
                        style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "red",
                            borderRadius: '100px',
                            animation: "blink 1s ease infinite",
                        }}
                    >
                        <style>
                            {`
          @keyframes blink {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}
                        </style>
                    </div>
                   </Stack>

                </Stack>
                <TextField
                    size="small"

                    placeholder="Search by ID or Phone Number"


                />
            </Stack>
            {[...Array(5)].map((_, index) => (
                <Stack key={index} sx={{ border: 1, borderColor: '#dadada', p: 1, borderRadius: 2, mb: 2 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>

                            <Typography sx={{ fontWeight: 500, fontSize: 14, color: 'green' }}>#132534</Typography>
                            <FiberManualRecordIcon sx={{ fontSize: 10, color: '#aeaeae' }} />
                            <Typography sx={{ fontSize: 12, color: '#aeaeae' }}>Sunday, 22 October 2025, 11:00AM</Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                            <AdjustIcon sx={{ color: 'green', fontSize: 14 }} />
                            <Typography sx={{ fontWeight: 500, fontSize: 12, color: 'green' }}>New order</Typography>

                        </Stack>
                    </Stack>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <div className="row">
                        <div className="col-md-4">
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Order Details ({items.length})</Typography>
                                <IconButton>
                                    <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />

                                </IconButton>
                            </Stack>
                            <Stack>
                                <Stack mt={0.2}>
                                    <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
                                        Delivery Name
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }}>Deepesh</Typography>

                                </Stack>
                                <Stack mt={0.2}>
                                    <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
                                        Phone number
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }}>+91 6360061656</Typography>

                                </Stack>
                                <Stack mt={0.2}>
                                    <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
                                        Address
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }}>
                                        Vigneshwara Kripa,
                                        Padubidre
                                    </Typography>

                                </Stack>
                            </Stack>
                        </div>
                        <div className="col-md-6">
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Ordered Items ({items.length})</Typography>
                                <IconButton>
                                    <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />

                                </IconButton>
                            </Stack>
                            <Stack sx={{ fontSize: 12, height: 100, overflowY: 'auto' }} mt={1}>
                                <TableContainer component={Paper} sx={{ maxWidth: 400, margin: "auto" }}>
                                    <Table size="small" aria-label="small table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontSize: "12px" }}><strong>#</strong></TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}><strong>Name</strong></TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}><strong>Qty</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map((item) => (
                                                <TableRow key={item.no}>
                                                    <TableCell sx={{ fontSize: "12px" }}>{item.no}</TableCell>
                                                    <TableCell sx={{ fontSize: "12px" }}>{item.name}</TableCell>
                                                    <TableCell sx={{ fontSize: "12px" }}>{item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </div>
                        <div className="col-md-2">
                            <Button variant="outlined" color="success" size="small" sx={{ textTransform: 'none' }} >Accept</Button>
                            <Button variant="outlined" color="error" size="small" sx={{ mt: 1, textTransform: 'none' }}>Cancel</Button>
                        </div>
                    </div>
                </Stack>
            ))}
        </Stack>
    )
}
export default LiveOrders;