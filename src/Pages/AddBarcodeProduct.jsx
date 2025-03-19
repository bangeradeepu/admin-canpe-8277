import React, { useState, useCallback, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from '@mui/material';
import Cropper from 'react-easy-crop';
import { storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import BarcodeScanner from '../Components/BarcodeScanner';

const AddBarcodeProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    productCost: '',
    productPrice: '',
    productQuantity: '',
    barcode: '',
    warehouse: 'PADU-ABHI-WAR-1',
    productImage: '',
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [barcodeScanned, setBarcodeScanned] = useState('');

  const warehouses = ['PADU-ABHI-WAR-1'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ['productCost', 'productPrice', 'productQuantity'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const fetchProductByBarcode = async (barcode) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/barcode/${barcode}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Product not found:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = product.productImage || 'https://placehold.jp/50x50.png';
      if (imageSrc) {
        imageUrl = await uploadImage();
      }

      const finalProduct = { ...product, productImage: imageUrl };
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, finalProduct);
      alert('Product Added Successfully');

      setProduct({
        productName: '',
        productCost: '',
        productPrice: '',
        productQuantity: '',
        barcode: '',
        warehouse: 'PADU-ABHI-WAR-1',
        productImage: '',
      });
      setImageSrc(null);
      setBarcodeScanned('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      {barcodeScanned ? (
        <Paper elevation={3} sx={{ padding: 3, width: 400 }}>
          <Typography variant="h5" gutterBottom>
            Add Product
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Barcode"
              type="text"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Product Cost"
              type="number"
              name="productCost"
              value={product.productCost}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Product Price"
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              name="productQuantity"
              value={product.productQuantity}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Warehouse"
              name="warehouse"
              value={product.warehouse}
              onChange={handleChange}
              margin="normal"
              required
            >
              {warehouses.map((wh) => (
                <MenuItem key={wh} value={wh}>
                  {wh}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Add Product
            </Button>
          </form>
        </Paper>
      ) : (
        <Stack>
          <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
        </Stack>
      )}
    </Box>
  );
};

export default AddBarcodeProduct;
