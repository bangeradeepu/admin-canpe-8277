import React, { useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = () => {
  const [data, setData] = useState("No barcode scanned");
  const [scanning, setScanning] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  let scannerInstance = null;

  React.useEffect(() => {
    if (scanning) {
      scannerInstance = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      });

      scannerInstance.render(
        (decodedText) => {
          setData(decodedText);
          setScanning(false);
          scannerInstance.clear();
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );

      return () => scannerInstance.clear();
    }
  }, [scanning]);

  const toggleFlashlight = async () => {
    if (scannerInstance) {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras.length > 0) {
          const cameraId = cameras[0].id;
          const torchStatus = flashlightOn ? "off" : "on";
          scannerInstance.applyVideoConstraints({
            advanced: [{ torch: torchStatus }]
          });
          setFlashlightOn(!flashlightOn);
        }
      } catch (error) {
        console.error("Flashlight toggle error:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Barcode Scanner</h2>
      {scanning && <div id="reader"></div>}
      <h3>Scanned Code: {data}</h3>
      <button onClick={() => setScanning(true)}>Scan Again</button>
      <button onClick={toggleFlashlight} style={{ marginLeft: "10px" }}>
        {flashlightOn ? "Turn Flashlight Off" : "Turn Flashlight On"}
      </button>
    </div>
  );
};

export default BarcodeScanner;