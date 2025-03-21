import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from 'notistack'

const API_URL = import.meta.env.VITE_API_URL;

const Broadcast = () => {
    const [broadcast, setBroadcast] = useState(null);
    const [broadcastTitle, setBroadcastTitle] = useState("");
    const [broadcastDescription, setBroadcastDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBroadcast();
    }, []);

    const fetchBroadcast = async () => {
        try {
            const response = await axios.get(`${API_URL}/settings`);
            if (response.data && response.data.broadcast) {
                setBroadcast(response.data.broadcast);
            }
        } catch (error) {
            console.error("Error fetching broadcast", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = { broadcastTitle, broadcastDescription };
            await axios.post(`${API_URL}/settings/broadcast`, payload);
            setBroadcast(payload);
            enqueueSnackbar('Broadcasted!', { variant: 'success' })
        } catch (error) {
            console.error("Error saving broadcast", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/settings/broadcast`);
            setBroadcast(null);
            setBroadcastTitle("");
            setBroadcastDescription("");
            enqueueSnackbar('Broadcast Deleted!', { variant: 'error' })
        } catch (error) {
            console.error("Error deleting broadcast", error);
        }
    };

    return (
        <Stack spacing={2}>
           <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
           <Typography variant="h5" gutterBottom>
                Broadcast Settings
            </Typography>
            {broadcast && (
            <img src="https://media.lordicon.com/icons/wired/lineal/1043-signal-streams.gif" width={40} alt="" />

            )}
           </Stack>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : broadcast ? (
                
                <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                    <Typography sx={{fontSize:18,fontWeight:500}}>{broadcast.broadcastTitle}</Typography>
                    <Typography sx={{fontSize:14,color:'#2e2e2e'}}>{broadcast.broadcastDescription}</Typography>
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="small"
                        sx={{ mt: 2, textTransform: "none" }} 
                        onClick={handleDelete}
                    >
                        Delete Broadcast
                    </Button>
                </Box>
            
               
            ) : (
                <Stack spacing={2}>
                    <TextField
                        label="Broadcast Title"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={broadcastTitle}
                        onChange={(e) => setBroadcastTitle(e.target.value)}
                    />
                    <TextField
                        label="Broadcast Description"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                        value={broadcastDescription}
                        onChange={(e) => setBroadcastDescription(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                        sx={{ mt: 2, textTransform: "none", backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
                    >
                        Submit
                    </Button>
                </Stack>
            )}
        </Stack>
    );
};

export default Broadcast;