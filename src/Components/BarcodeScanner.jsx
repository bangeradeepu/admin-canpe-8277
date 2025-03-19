import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = () => {
  const [data, setData] = useState("No barcode scanned");
  const [scanning, setScanning] = useState(true);

  React.useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      });

      scanner.render(
        (decodedText) => {
          setData(decodedText);
          setScanning(false);
          scanner.clear();
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );

      return () => scanner.clear();
    }
  }, [scanning]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Barcode Scanner</h2>
      {scanning && <div id="reader"></div>}
      <h3>Scanned Code: {data}</h3>
      <button onClick={() => setScanning(true)}>Scan Again</button>
    </div>
  );
};

export default BarcodeScanner;
