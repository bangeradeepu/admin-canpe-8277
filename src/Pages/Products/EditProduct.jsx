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
  Checkbox,
  FormControlLabel,
  Switch
} from "@mui/material";
import { useParams } from "react-router-dom";
import Cropper from "react-easy-crop";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import RestaurantIcon from "@mui/icons-material/Restaurant"; // Non-Veg Icon
import SpaIcon from "@mui/icons-material/Spa"; // Veg Icon
import { Ham } from 'lucide-react';
import { Vegan } from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getCategory();
    getWarehouse();
    getUnit();
    fetchProductById();
  }, []);

  const [categoryData, setCategoryData] = useState([]);
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/category`
      );
      console.log(response.data.category);
      setCategoryData(response.data.category);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const [unit, setUnit] = useState([]);
  const getUnit = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/units`);
      console.log(response.data.units);
      setUnit(response.data.units);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
    productDiscount: "",
    discountEnabled: false,
    iseNewProduct: false,
    pcs: "1",
    tag: true,
  });

  const handleDiscountCheck = (event) => {
    setProduct({ ...product, discountEnabled: event.target.checked });
  };
  const handleNewProduct = (event) => {
    setProduct({ ...product, iseNewProduct: event.target.checked });
  };

  const [isVeg, setIsVeg] = useState(true);
  const handleVegNonVeg = (event) => {
    const newValue = event.target.checked;
    setIsVeg(newValue);
    setProduct(prev => ({ ...prev, tag: newValue }));
  };
  const fetchProductById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      const productData = response.data.product;
  
      // Set isVeg based on the product's tag value
      setIsVeg(productData.tag);
  
      setProduct({
        ...productData,
        category: productData.category?.categoryId || "",
        warehouse: productData.warehouse?.warehouseId || "",
        unit: productData.unit?.unitId || "",
        unitValue: productData.unit?.unitValue || "",
        tag: productData.tag
      });
  
      console.log(productData);
    } catch (error) {
      console.error("Product not found:", error);
    }
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
        "productDiscount",
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
      let imageUrl = product.productImage; // Start with current image
  
      // Only process image if a new one was selected
      if (imageSrc) {
        // Delete old image if it's not the default placeholder
        if (product.productImage && !product.productImage.includes('placehold.jp')) {
          try {
            // Extract the path from the URL
            const oldImagePath = product.productImage.split('/o/')[1].split('?')[0];
            const oldImageRef = ref(storage, decodeURIComponent(oldImagePath));
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
            // Continue even if deletion fails
          }
        }
  
        // Upload new image
        imageUrl = await uploadImage();
      }
  
      const finalProduct = { ...product, productImage: imageUrl };
      console.log("final payload", finalProduct);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        finalProduct
      );
      enqueueSnackbar("Product Updated!", { variant: "success" });
  
      // Reset form
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
        productDiscount: "",
        discountEnabled: false,
        iseNewProduct: false,
        pcs: "1",
        tag: true,
      });
  
      setImageSrc(null);
      setCroppedImage(null);
      navigate("/productList");
    } catch (error) {
      console.error("Error adding product:", error);
  
      if (error.response?.data?.message === "Barcode already exists") {
        enqueueSnackbar("Item already exists", { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack sx={{ p: 1 }}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <BackButton />
        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Edit Product
        </Typography>
      </Stack>

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
                label="Product Discount"
                type="number"
                name="productDiscount"
                value={product.productDiscount}
                onChange={handleChange}
                margin="normal"
                size="small"

              />
            </div>
            <div className="col-md-6 mt-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product.discountEnabled}
                    onChange={handleDiscountCheck}
                    color="primary"
                  />
                }
                label="Enable Discount"
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
            <div className="col-md-6 mt-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product.iseNewProduct}
                    onChange={handleNewProduct}
                    color="primary"
                  />
                }
                label="New Product"
              />
            </div>
          </div>
          <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={1}>
            {isVeg ? <Vegan sx={{ color: "green" }} /> : <Ham sx={{ color: "red" }} />}
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isVeg}
                  onChange={handleVegNonVeg}
                  color="success"
                />
              }
              label={
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {isVeg ? "Veg" : "Non-Veg"}
                </Typography>
              }
            />
          </Stack>
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
            <CircularProgress sx={{ display: "block", margin: "10px auto" }} />
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
            Edit Product
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default EditProduct;
