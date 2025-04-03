import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import dayjs from "dayjs";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Stack,
  Box,
  Divider,
  IconButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import VisibilitySwitch from "../../Components/VisibilitySwitch";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleEditProduct = () => {
    navigate(`/editProduct/${id}`);
  };
  const matches = useMediaQuery("(min-width:600px)");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantityUpdate, setQuantityUpdate] = useState("");

  useEffect(() => {
    console.log("Product ID:", id);
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      console.log(response.data.product);
      setProductData(response.data.product);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      // Delete image from Firebase Storage if URL exists
      if (imageUrl !== "https://placehold.jp/50x50.png") {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase");
      }

      // Delete product from API
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      console.log("Product deleted successfully", response);
      navigate(`/productList/`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const fetchProductDetails = async (barcode) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/barcode/${barcode}`
      );
      console.log(response.data.product);
      setSelectedProduct(response.data.product);
      setIsModalOpen(true);
      setQuantityUpdate(response.data.product?.productQuantity);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const updateQuantity = async (action) => {
    if (!selectedProduct || quantityUpdate < 0) {
      console.error("Invalid quantity update");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/updateQuantity/${
          selectedProduct.barcode
        }`,
        { productQuantity: quantityUpdate, action }
      );

      console.log("Update Success:", response.data);
      getProduct(); // Refresh product list after update
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
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

  if (!productData) {
    return (
      <Typography variant="h6" textAlign="center" mt={4} color="error">
        Product not found!
      </Typography>
    );
  }

  return (
    <Stack sx={{ p: 1 }} spacing={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <BackButton />
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
            Product Details
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems={"center"}
        >
          <IconButton
            sx={{ color: "green" }}
            onClick={() => fetchProductDetails(productData.barcode)}
          >
            <ProductionQuantityLimitsOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => handleEditProduct()}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDelete(productData._id, productData.productImage)
            }
            sx={{ color: "#D84040" }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {productData.isVisible ? (
          <Stack direction={"row"} alignItems={"center"}>
            <FiberManualRecordIcon sx={{ color: "#3D8D7A", fontSize: 14 }} />
            <Typography
              sx={{ color: "#3D8D7A", fontSize: 14, fontWeight: 500 }}
            >
              Visible
            </Typography>
          </Stack>
        ) : (
          <Stack direction={"row"} alignItems={"center"}>
            <FiberManualRecordIcon sx={{ color: "#D84040", fontSize: 14 }} />
            <Typography
              sx={{ color: "#D84040", fontSize: 14, fontWeight: 500 }}
            >
              Disabled
            </Typography>
          </Stack>
        )}
        <VisibilitySwitch productId={id} initialVisibility={productData.isVisible} reloadContent={getProduct} />
      </Stack>
      {/* Product Header */}
      <Stack direction={!matches ? "column" : "row"} spacing={2}>
        <Stack>
          <img
            src={productData.productImage}
            alt={productData.productName}
            style={{
              width: 300,
              height: 300,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Stack>
        <Stack>
          <Stack direction={"row"} spacing={4} mb={2}>
            <QRCodeCanvas value={productData.barcode.toString()} size={100} />
            <Barcode
              value={productData.barcode.toString()}
              width={1.5}
              height={50}
            />
          </Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#2e2e2e" }}>
            {productData.productName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="textSecondary">
            SKU: {productData.sku}
          </Typography>
          <Stack sx={{ mt: 1 }}>
            <Stack>
              <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
                Description
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {productData.description}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 1 }}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
                  Unit
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {productData.unit?.unitValue}&nbsp;
                  {productData.unit?.unitName}
                </Typography>
              </div>
              <div className="col-md-6 mb-2">
                <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
                  PCS
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{productData.pcs}</Typography>
              </div>
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Divider />

      <Stack>
        <div className="row">
          <div className="col-md-4 mb-2">
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              Product Cost (Purchase Price)
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "orange" }}>
              ₹{productData.productCost}
            </Typography>
          </div>
          <div className="col-md-4 mb-2">
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              Product Price (Display Price)
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "green" }}>
              ₹{productData.productPrice}
            </Typography>
          </div>
          <div className="col-md-4 mb-2">
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              MRP (Maximum Retail Price)
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              ₹{productData.productDiscount}
            </Typography>
          </div>
        </div>
      </Stack>

      <Stack>
        <div className="row">
          <div className="col-md-4 mb-2">
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              Category
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {productData.category?.categoryName}
            </Typography>
          </div>
          <div className="col-md-4 mb-2">
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              Warehouse
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {productData.warehouse?.warehouseName}
            </Typography>
          </div>
          <div className="col-md-4 mb-2">
            <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
              Stock Quantity
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {productData.productQuantity}
            </Typography>
          </div>
        </div>
      </Stack>
      <Divider />
      <Stack>
        <Stack>
          <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
            Created On
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            {dayjs(productData.createdAt).format("YYYY-MM-DD HH:mm")}
          </Typography>
        </Stack>
        <Stack mt={2}>
          <Typography sx={{ fontSize: 12, color: "#aeaeae" }}>
            Modified On
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            {dayjs(productData.modifiedAt).format("YYYY-MM-DD HH:mm")}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Typography sx={{ fontSize: 10, color: "#aeaeae" }}>
          {productData._id}
        </Typography>
      </Stack>
      {/* Quantity Adjustment Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
      >
        <DialogTitle>Product Quantity Details</DialogTitle>
        <DialogContent>
          {selectedProduct ? (
            <Stack spacing={1}>
              <Typography>
                <strong>Product:</strong> {selectedProduct.productName}
              </Typography>
              <Typography>
                <strong>Barcode:</strong> {selectedProduct.barcode}
              </Typography>
              <Typography>
                <strong>Cost:</strong> ₹{selectedProduct.productCost}
              </Typography>
              <Typography>
                <strong>Price:</strong> ₹{selectedProduct.productPrice}
              </Typography>
              <Typography>
                <strong>Warehouse:</strong>{" "}
                {selectedProduct.warehouse?.warehouseName}
              </Typography>
              <Typography>
                <strong>Current Quantity:</strong>{" "}
                {selectedProduct.productQuantity}
              </Typography>
              <TextField
                size="small"
                placeholder="Quantity"
                value={quantityUpdate}
                onChange={(e) => setQuantityUpdate(e.target.value)}
                required
              />
            </Stack>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => updateQuantity("sub")}
          >
            Subtraction
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => updateQuantity("add")}
          >
            Addition
          </Button>
          <Button
            variant="outlined"
            color=""
            onClick={() => updateQuantity("adjust")}
          >
            Adjust
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ViewProduct;
