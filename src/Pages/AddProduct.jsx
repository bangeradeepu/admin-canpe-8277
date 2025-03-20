import React, { useState, useCallback } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import Cropper from "react-easy-crop";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productCost: "",
    productPrice: "",
    productQuantity: "",
    barcode: "",
    warehouse: "PADU-ABHI-WAR-1",
    productImage: "",
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const warehouses = ["PADU-ABHI-WAR-1"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: [
        "productCost",
        "productPrice",
        "productQuantity",
        "barcode",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImageSrc(reader.result);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 300; // Square size
    canvas.height = 300;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        setCroppedImage(blob);
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const uploadImage = async () => {
    const croppedBlob = await getCroppedImage();
    if (!croppedBlob) return "";

    setUploading(true);
    const storageRef = ref(storage, `canpe-product-images/${Date.now()}.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, croppedBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setUploading(false);
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "https://placehold.jp/50x50.png"; // Default placeholder

      if (imageSrc) {
        imageUrl = await uploadImage(); // Upload if an image is selected
      }

      const finalProduct = { ...product, productImage: imageUrl };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        finalProduct
      );
      alert("Product Added Successfully");

      setProduct({
        productName: "",
        productCost: "",
        productPrice: "",
        productQuantity: "",
        warehouse: "PADU-ABHI-WAR-1",
        productImage: "",
      });

      setImageSrc(null);
      setCroppedImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        Add Product
      </Typography>
      <Box>

      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Barcode"
              type="number"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              margin="normal"
              size="small"
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Product Cost"
              type="number"
              name="productCost"
              value={product.productCost}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Product Price"
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              name="productQuantity"
              value={product.productQuantity}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              select
              label="Warehouse"
              name="warehouse"
              value={product.warehouse}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            >
              {warehouses.map((wh) => (
                <MenuItem key={wh} value={wh}>
                  {wh}
                </MenuItem>
              ))}
            </TextField>
          </div>

        </div>







        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "10px", width: '100%' }}
        />
        {imageSrc && (
          <div>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                marginTop: 2,
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
          </div>
        )}

        {uploading && (
          <CircularProgress
            sx={{ display: "block", margin: "10px auto" }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#000000",
            "&:hover": { backgroundColor: "#333333" },
          }}
          disabled={uploading}
        >
          Add Product
        </Button>
      </form>
      </Box>
    </Stack>
  );
};

export default AddProduct;
