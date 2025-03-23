import React, { useState, useCallback, useEffect } from "react";
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
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import BarcodeScanner from "../../Components/BarcodeScanner";
import { enqueueSnackbar } from "notistack";

const AddBarcodeProduct = () => {
  useEffect(() => {
    getCategory();
    getWarehouse();
    getUnit();
  }, []);

  const [categoryData, setCategoryData] = useState([]);
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/category`
      );
      console.log(response.data.category);
      setCategoryData(response.data.category);
    } catch (error) {
      console.error(error);
    }
  };

  const [warehouse, setWarehouse] = useState([]);
  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/warehouse`
      );
      console.log(response.data.warehouse);
      setWarehouse(response.data.warehouse);
    } catch (error) {
      console.error(error);
    }
  };

  const [unit, setUnit] = useState([]);
  const getUnit = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/units`);
      console.log(response.data.units);
      setUnit(response.data.units);
    } catch (error) {
      console.error(error);
    }
  };

  const [product, setProduct] = useState({
    productName: "",
    productCost: "",
    productPrice: "",
    productQuantity: "",
    barcode: "",
    category: null,
    warehouse: "",
    unit: "",
    unitValue: "",
    productImage: "",
    description: "",
    productMrp: "",
    pcs: "1",
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [barcodeScanned, setBarcodeScanned] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow empty input for smooth editing
    if (value === "") {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    // Convert to number and prevent negative values
    setProduct((prev) => ({
      ...prev,
      [name]: [
        "productCost",
        "productPrice",
        "productQuantity",
        "barcode",
        "productMrp",
        "pcs",
      ].includes(name)
        ? Math.max(0, Number(value)) // Prevents negative numbers
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

  const fetchProductByBarcode = async (barcode) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/barcode/${barcode}`
      );
      const productData = response.data.product;

      setProduct({
        ...productData,
        category: productData.category?.categoryId || "",
        warehouse: productData.warehouse?.warehouseId || "",
        unit: productData.unit?.unitId || "",
        unitValue: productData.unit?.unitValue || "",
      });

      console.log(productData);
    } catch (error) {
      console.error("Product not found:", error);
    }
  };

  const handleBarcodeScanned = useCallback((scannedBarcode) => {
    setProduct((prev) => ({
      ...prev,
      barcode: scannedBarcode,
    }));
    setBarcodeScanned(scannedBarcode);
    fetchProductByBarcode(scannedBarcode);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const handleCropChange = useCallback((newCrop) => {
    setCrop(newCrop);
  }, []);

  const handleZoomChange = useCallback((newZoom) => {
    setZoom(newZoom);
  }, []);

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
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
      let imageUrl = "https://placehold.jp/50x50.png";

      if (imageSrc) {
        imageUrl = await uploadImage();
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
        category: null,
        warehouse: "",
        unit: "",
        unitValue: "",
        barcode: "",
        productImage: "",
        description: "",
        pcs: "1",
      });

      setImageSrc(null);
      setCroppedImage(null);
      setBarcodeScanned("");
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response.data.message === "Barcode already exists") {
        enqueueSnackbar("Item already exists", { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      }
    }
  };

  return (
    <Stack>
      {barcodeScanned ? (
        <Stack>
          <Typography variant="h5" gutterBottom>
            Add Product
          </Typography>

          <Box sx={{p:1}}>
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
                    label="Product MRP"
                    type="number"
                    name="productMrp"
                    value={product.productMrp}
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
                    {warehouse.map((wh) => (
                      <MenuItem key={wh._id} value={wh._id}>
                        {wh.warehouseName}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    value={product.category || ""}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
                  >
                    {categoryData.map((ca) => (
                      <MenuItem key={ca._id} value={ca._id}>
                        {ca.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    label="PCS"
                    type="number"
                    name="pcs"
                    value={product.pcs}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                        fullWidth
                        select
                        label="Unit"
                        name="unit"
                        value={product.unit || ""}
                        onChange={handleChange}
                        margin="normal"
                        size="small"
                        required
                      >
                        {unit.map((uni) => (
                          <MenuItem key={uni._id} value={uni._id}>
                            {uni.unitName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-md-6">
                      <TextField
                        fullWidth
                        label="Unit value"
                        type="text"
                        name="unitValue"
                        value={product.unitValue}
                        onChange={handleChange}
                        margin="normal"
                        size="small"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <TextField
                sx={{ mt: 1 }}
                name="description"
                id="desc"
                label="Description"
                variant="outlined"
                multiline
                rows={4} // Adjust the number of rows as needed
                fullWidth
                value={product.description}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginTop: "10px", width: "100%" }}
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
                      onCropChange={handleCropChange}
                      onZoomChange={handleZoomChange}
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
                  textTransform: "none",
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
      ) : (
        <Stack>
          <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
        </Stack>
      )}
    </Stack>
  );
};

export default AddBarcodeProduct;
