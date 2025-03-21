import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import SportsMotorsportsOutlinedIcon from "@mui/icons-material/SportsMotorsportsOutlined";
import MobileScreenShareOutlinedIcon from "@mui/icons-material/MobileScreenShareOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

const StatusIndicator = () => {
  const navigate = useNavigate();
  const [setting, settingData] = useState({});
  const [location, setLocation] = useState({});
  const [ip, setIp] = useState("");

  useEffect(() => {
    getSettingData();
    fetchIP();
  }, []);
  const getSettingData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/settings`
      );

      console.log("Setting", response.data);
      settingData(response.data);
      getLocation(response.data.map.latitude, response.data.map.longitude);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async (lat, long) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      );
      console.log("Map data", response.data.address);
      setLocation(response.data.address);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      console.log(response.data.ip);
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Stack
      sx={{
        p: 2,
        backgroundColor: "white",
        width: "20%",
        height: "82vh",
        borderRadius: 2,
        fontSize: 14,
        border: 1,
        borderColor: "#dadada",
        overflowY: "auto",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ mb: 2 }}
      >
        <Typography sx={{ fontSize: 14 }}>{formattedDate}</Typography>
        {setting?.broadcast && (
          <img
            onClick={() => navigate("/broadcast")}
            sx={{ cursor: "pointer" }}
            src="https://media.lordicon.com/icons/wired/lineal/1043-signal-streams.gif"
            width={30}
            alt=""
          />
        )}
      </Stack>
      <div className="row">
        <Stack className="col-md-6" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
            Store Status
          </Typography>
          {true ? (
            <Stack direction={"row"} alignItems={"center"}>
              <FiberManualRecordIcon sx={{ color: "#3D8D7A", fontSize: 14 }} />
              <Typography
                sx={{ color: "#3D8D7A", fontSize: 14, fontWeight: 500 }}
              >
                Online
              </Typography>
            </Stack>
          ) : (
            <Stack direction={"row"} alignItems={"center"}>
              <FiberManualRecordIcon sx={{ color: "#D84040", fontSize: 14 }} />
              <Typography
                sx={{ color: "#D84040", fontSize: 14, fontWeight: 500 }}
              >
                Offline
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack className="col-md-6" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
            System Status
          </Typography>
          {true ? (
            <Typography
              sx={{ color: "#3D8D7A", fontSize: 14, fontWeight: 500 }}
            >
              All Good
            </Typography>
          ) : (
            <Typography
              sx={{ color: "#D84040", fontSize: 14, fontWeight: 500 }}
            >
              Bad
            </Typography>
          )}
        </Stack>
      </div>

      <Divider sx={{ mb: 2 }} />
      <Stack className="col-md-6" sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
          Delivery Location
        </Typography>
        <Typography sx={{ fontSize: 14 }}>{location.town}</Typography>
      </Stack>
      <Stack sx={{ border: 1, borderRadius: 2, borderColor: "#aeaeae", p: 1 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
            Live Orders
          </Typography>
          <SensorsOutlinedIcon sx={{ fontSize: 18, color: "#D84040" }} />
        </Stack>
        <div className="row">
          <Stack className="col-md-6" sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              To deliver
            </Typography>
            <Typography
              sx={{ color: "#D84040", fontSize: 26, fontWeight: 500 }}
            >
              20
            </Typography>
          </Stack>
          <Stack className="col-md-6" sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              Yet to accept
            </Typography>
            <Typography
              sx={{ color: "#FBA518", fontSize: 26, fontWeight: 500 }}
            >
              5
            </Typography>
          </Stack>
        </div>
        <Typography
          onClick={() => navigate("/broadcast")}
          sx={{ fontSize: 10, textDecoration: "underline", cursor: "pointer" }}
        >
          View All
        </Typography>
      </Stack>
      <Stack
        sx={{ border: 1, borderRadius: 2, borderColor: "#aeaeae", p: 1, mt: 2 }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
            Delivery Partner
          </Typography>
          <SportsMotorsportsOutlinedIcon sx={{ fontSize: 18 }} />
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ fontSize: 12 }}>Muttappa</Typography>
            <Typography
              sx={{ fontSize: 12, color: "#3D8D7A", fontWeight: 600 }}
            >
              Online
            </Typography>
          </Stack>
          <Divider sx={{ mt: 0.5, mb: 0.5 }} />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ fontSize: 12 }}>Deepesh</Typography>
            <Typography
              sx={{ fontSize: 12, color: "#D84040", fontWeight: 600 }}
            >
              Offline
            </Typography>
          </Stack>
          <Divider sx={{ mt: 0.5, mb: 0.5 }} />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ fontSize: 12 }}>Shashank</Typography>
            <Typography
              sx={{ fontSize: 12, color: "#FBA518", fontWeight: 600 }}
            >
              On Delivery
            </Typography>
          </Stack>
          <Typography
            onClick={() => navigate("/broadcast")}
            sx={{
              fontSize: 10,
              textDecoration: "underline",
              cursor: "pointer",
              mt: 2,
            }}
          >
            View All
          </Typography>
        </Stack>
      </Stack>
      <Stack mt={2} direction={"row"} justifyContent={"space-between"}>
        <Stack>
          <Stack direction={"row"} spacing={1}>
            <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
              Your IP:
            </Typography>
            <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
              {ip || "Fetching...."}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
            www.canpe.online
          </Typography>

          <Typography
            sx={{ fontSize: 10, color: "#aeaeae", textDecoration: "underline" }}
          >
            v0.1
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton>
            <MobileScreenShareOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton>
            <PowerSettingsNewOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StatusIndicator;
