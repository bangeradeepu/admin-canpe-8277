import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import BackButton from "../../Components/BackButton";

const API_URL = import.meta.env.VITE_API_URL;
const GOOGLE_MAPS_API_KEY = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"; // Replace with your API key

const MapSettings = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [radius, setRadius] = useState("");
    const [address, setAddress] = useState("");
    const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
    const [settingId, setSettingId] = useState(null);
    const [map, setMap] = useState(null);
    const [circle, setCircle] = useState(null);

    useEffect(() => {
        fetchMapData();
        loadGoogleMapsScript();
    }, []);

    useEffect(() => {
        if (map) {
            updateMap();
        }
    }, [latitude, longitude, radius]);

    const fetchMapData = async () => {
        try {
            const response = await axios.get(`${API_URL}/settings/maps`);
            if (response.data.length > 0) {
                const mapData = response.data[0].map;
                setLatitude(mapData.latitude);
                setLongitude(mapData.longitude);
                setRadius(mapData.radius);
                setMarkerPosition({ lat: parseFloat(mapData.latitude), lng: parseFloat(mapData.longitude) });
                setSettingId(response.data[0]._id);
            } else {
                await createInitialMapData();
            }
        } catch (error) {
            console.error("Error fetching map data:", error);
        }
    };

    const createInitialMapData = async () => {
        try {
            const response = await axios.post(`${API_URL}/settings/maps`, {
                map: {
                    latitude: "13.141003",
                    longitude: "74.770353",
                    radius: "5",
                },
            });
            setSettingId(response.data._id);
            setLatitude(response.data.map.latitude);
            setLongitude(response.data.map.longitude);
            setRadius(response.data.map.radius);
            setMarkerPosition({ lat: parseFloat(response.data.map.latitude), lng: parseFloat(response.data.map.longitude) });
        } catch (error) {
            console.error("Error creating initial map data:", error);
        }
    };

    const handleSubmit = async () => {
        if (!latitude || !longitude || !radius) return;
        try {
            await axios.put(`${API_URL}/settings/maps/${settingId}`, {
                map: { latitude, longitude, radius },
            });
            setMarkerPosition({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
            enqueueSnackbar("Updated!", { variant: "success" });
            updateMap();
        } catch (error) {
            console.error("Error updating map data:", error);
        }
    };

    useEffect(() => {
        getAddress();
    }, [latitude, longitude]);

    const getAddress = async () => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            setAddress(response.data?.address);
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    const loadGoogleMapsScript = () => {
        if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        } else {
            initializeMap();
        }
    };

    const initializeMap = () => {
        const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
            center: markerPosition,
            zoom: 14,
        });

        setMap(mapInstance);
        drawCircle(mapInstance);
    };

    const drawCircle = (mapInstance) => {
        if (circle) {
            circle.setMap(null);
        }

        const newCircle = new window.google.maps.Circle({
            strokeColor: "red",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "red",
            fillOpacity: 0.35,
            map: mapInstance,
            center: markerPosition,
            radius: parseFloat(radius) * 1000, // Convert km to meters
        });

        setCircle(newCircle);
    };

    const updateMap = () => {
        if (map) {
            map.setCenter(markerPosition);
            drawCircle(map);
        }
    };

    return (
        <Stack spacing={2}>
            <Stack direction={'row'} alignItems={'center'}  spacing={1}>
                <BackButton />
            <Typography variant="h5" gutterBottom>
                Map Settings
            </Typography>
            </Stack>
           
            <Stack sx={{ p: 2, border: 1, borderColor: "#dadada", borderRadius: 2 }}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <TextField
                            label="Latitude"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <TextField
                            label="Longitude"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <TextField
                            label="Radius Distance (km)"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                        />
                    </div>
                </div>

                <Button
                    sx={{ mt: 2, textTransform: "none", backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
            <Stack sx={{ p: 1, border: 1, borderColor: "#dadada", borderRadius: 2 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>Map Details</Typography>
                <div className="row">
                    <Stack className="col-md-6" sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>Latitude</Typography>
                        <Typography>{latitude}</Typography>
                    </Stack>
                    <Stack className="col-md-6" sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>Longitude</Typography>
                        <Typography>{longitude}</Typography>
                    </Stack>
                </div>
                <div className="row">
                    <Stack className="col-md-6" sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>Radius Covered</Typography>
                        <Typography>{radius}</Typography>
                    </Stack>
                    <Stack className="col-md-6" sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>Address</Typography>
                        <Typography>{address?.town}</Typography>
                        <Typography>{address?.county},{address?.state_district},{address?.state}</Typography>
                        <Typography>{address?.country}-{address?.postcode}</Typography>
                    </Stack>
                </div>
            </Stack>
            <Box sx={{ mt: 2, p: 1, border: 1, borderColor: "#dadada", borderRadius: 2 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>Map radius preview</Typography>
                <div id="map" style={{ width: "100%", height: "400px" }}></div>
            </Box>
            <Box elevation={3} sx={{ mt: 2, p: 1, border: 1, borderColor: "#dadada", borderRadius: 2 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>Map center point preview</Typography>
                <iframe width="100%" height="400px" src={`https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}&hl=es;z=14&output=embed`} style={{ border: 0 }} allowFullScreen></iframe>
            </Box>
        </Stack>
    );
};

export default MapSettings;
