import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = ({ onBarcodeScanned }) => {
  const [data, setData] = useState("No barcode scanned");
  const [scanner, setScanner] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (scanning && !scanner) {
      const newScanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      newScanner.render(
        (decodedText) => {
          setData(decodedText);
          onBarcodeScanned(decodedText);
          setScanning(false);
          newScanner.clear();
          setScanner(null);
        },
        (error) => console.log(error)
      );

      setScanner(newScanner);
    }

    return () => {
      if (scanner) {
        scanner.clear();
        setScanner(null);
      }
    };
  }, [scanning]);

  return (
    <Box textAlign="center">
      <Typography variant="h5">Barcode Scanner</Typography>
      {scanning && <div id="reader"></div>}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Scanned Code: {data}
      </Typography>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          mt: 2,
          backgroundColor: "#000000",
          "&:hover": { backgroundColor: "#333333" },
        }}
        onClick={() => setScanning(true)}
      >
        Scan Again
      </Button>
    </Box>
  );
};

export default BarcodeScanner;
