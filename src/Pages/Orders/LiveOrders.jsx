import React, { useState, useEffect } from "react";
import { IconButton, TextField, Button, Stack, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import BackButton from "../../Components/BackButton";
import AdjustIcon from '@mui/icons-material/Adjust';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';
import FormattedDateIST from "../../Components/FormattedDateIST";
import Pusher from 'pusher-js';


const LiveOrders = () => {

    const [pusher, setPusher] = useState(null);

    // Pusher Config
    useEffect(() => {
        const pusherInstance = new Pusher('36dba3670bc31f93e66a', {
            cluster: 'ap2',
            encrypted: true,
        });

        console.log(pusherInstance);
        setPusher(pusherInstance);
        return () => {
            if (pusherInstance) {
                pusherInstance.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!pusher) return;
        const channel = pusher.subscribe('order-channel');
        channel.bind("order-created", (data) => {
            const { customerName } = data;
            console.log(customerName);
        });
    }, [])



    useEffect(() => {
        // Enable logging (optional but useful for debugging)
        Pusher.logToConsole = true;

        // Connect to Pusher
        const pusher = new Pusher('36dba3670bc31f93e66a', {
            cluster: 'ap2',
        });

        // Subscribe to the correct channel
        const channel = pusher.subscribe('order-channel');

        // Bind to the correct event name
        channel.bind('order-created', function (data) {
            console.log('📦 New Order Received via Pusher:', data);

            // You can also show a toast or alert here
            alert(`New Order #${data.orderNumber} from ${data.customerName}`);
        });

        // Clean up on unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);



    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        getData();
    }, []);




    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
            console.log('orders', response.data.orders);
            setOrderData(response.data.orders);
        } catch (error) {
            console.error(error);
        }
    }

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
            {orderData.map((order, index) => (
                <Stack key={order._id} sx={{ border: 1, borderColor: '#dadada', p: 1, borderRadius: 2, mb: 2 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>

                            <Typography sx={{ fontWeight: 500, fontSize: 14, color: 'green' }}>#{order.orderNumber}</Typography>
                            <FiberManualRecordIcon sx={{ fontSize: 10, color: '#aeaeae' }} />
                            <Typography sx={{ fontSize: 12, color: '#aeaeae' }}><FormattedDateIST isoDateString={order.createdAt} /></Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                            <AdjustIcon sx={{ color: 'green', fontSize: 14 }} />
                            <Typography sx={{ fontWeight: 500, fontSize: 12, color: 'green' }}>{order.orderStatus}</Typography>

                        </Stack>
                        <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                            <AdjustIcon sx={{ color: 'green', fontSize: 14 }} />
                            <Typography sx={{ fontWeight: 500, fontSize: 12, color: 'green' }}>New order</Typography>

                        </Stack>
                    </Stack>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Order Details (2)</Typography>
                                <IconButton>
                                    <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />

                                </IconButton>
                            </Stack>
                            <Stack>
                                <Stack mt={0.2}>
                                    <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
                                        Delivery Name
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }}>{order.orderDetails?.custName}</Typography>

                                </Stack>
                                <Stack mt={0.2}>
                                    <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
                                        Phone number
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }}>{order.orderDetails?.custPno}</Typography>

                                </Stack>
                                <Stack mt={0.2}>
                                    <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
                                        Address
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }}>
                                        {order.orderDetails?.address?.house},
                                        {order.orderDetails?.address?.road},
                                        {order.orderDetails?.address?.landmark},

                                    </Typography>

                                </Stack>
                            </Stack>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Ordered Items ({order.orderItem.length})</Typography>
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
                                            {order.orderItem?.map((item, index) => (
                                                <TableRow key={item._id}>
                                                    <TableCell sx={{ fontSize: "12px" }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ fontSize: "12px" }}>{item.productName}</TableCell>
                                                    <TableCell sx={{ fontSize: "12px" }}>{item.qty}</TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </div>
                        <div className="col-md-2">
                            <Stack direction={'column'} spacing={2}>
                                <Button variant="outlined" color="success" size="small" sx={{ textTransform: 'none' }} >Accept</Button>
                                <Button variant="outlined" color="error" size="small" sx={{ textTransform: 'none' }}>Cancel</Button>
                            </Stack>
                        </div>
                    </div>
                </Stack>
            ))}
        </Stack>
    )
}
export default LiveOrders;