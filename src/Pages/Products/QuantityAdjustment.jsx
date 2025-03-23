import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Stack,
    Button,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "../../Components/BarcodeScanner";

const QuantityAdjustment = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScanning, setIsScanning] = useState(false); // State to toggle scanner
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [quantityUpdate,setQuantityUpdate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
            setProducts(response.data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleBarcodeScanned = (barcode) => {
        setSearchQuery(barcode); // Set barcode as search query
        setIsModalOpen(true);
        fetchProductDetails(barcode);
        setIsScanning(false); // Close scanner after scanning
    };

    const filteredProducts = products.filter(
        (product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.barcode && product.barcode.toString().includes(searchQuery))
    );


    const fetchProductDetails = async (barcode) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/barcode/${barcode}`);
            console.log(response.data.product)
            setSelectedProduct(response.data.product);
            setIsModalOpen(true);
            setQuantityUpdate(response.data.product?.productQuantity)
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    const updateQuantity = async () => {
        if (!selectedProduct || quantityUpdate < 0) {
            console.error("Invalid quantity update");
            return;
        }
    
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/products/updateQuantity/${selectedProduct.barcode}`,
                { productQuantity: quantityUpdate }
            );
    
            console.log("Update Success:", response.data);
            getData(); // Refresh product list after update
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };
    return (
        <Stack p={1}>
            {isScanning ? (
                <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
            ) : (
                <>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="h5" gutterBottom>
                            Quantity Adjustment
                        </Typography>
                        <Button onClick={() => navigate('/addProduct')} size="small" sx={{ textTransform: 'none' }} startIcon={<AddIcon />}>
                            Add Product
                        </Button>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} spacing={1} mt={2} mb={2}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Search by Product Name or Barcode"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <IconButton onClick={() => setIsScanning(true)}>
                            <QrCodeScannerIcon />
                        </IconButton>
                    </Stack>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {["Images", "Product Name", "Cost", "Price", "Quantity", "Warehouse", "Actions"].map((heading, index) => (
                                    <TableCell key={index} sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                                        {heading}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <img width={40} src={product.productImage} alt="" />
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "0.8rem" }}>{product.productName}</TableCell>
                                        <TableCell sx={{ fontSize: "0.8rem" }}>₹{product.productCost}</TableCell>
                                        <TableCell sx={{ fontSize: "0.8rem" }}>₹{product.productPrice}</TableCell>
                                        <TableCell sx={{ fontSize: "0.8rem" }}>{product.productQuantity}</TableCell>
                                        <TableCell sx={{ fontSize: "0.8rem" }}>{product.warehouse?.warehouseName}</TableCell>
                                        <TableCell sx={{ fontSize: "0.8rem" }}>
                                            <Stack direction={'row'} spacing={1}>
                                                <IconButton onClick={() => fetchProductDetails(product.barcode)}>
                                                    <ProductionQuantityLimitsIcon fontSize="small" sx={{ cursor: "pointer", color: '#2e2e2e' }} />

                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ fontSize: "0.8rem" }}>
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </>
            )}
            {/* Quantity Adjustment Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth>
                <DialogTitle>Product Quantity Details</DialogTitle>
                <DialogContent>
                    {selectedProduct ? (
                        <Stack spacing={1}>
                            <Typography><strong>Product:</strong> {selectedProduct.productName}</Typography>
                            <Typography><strong>Barcode:</strong> {selectedProduct.barcode}</Typography>
                            <Typography><strong>Cost:</strong> ₹{selectedProduct.productCost}</Typography>
                            <Typography><strong>Price:</strong> ₹{selectedProduct.productPrice}</Typography>
                            <Typography><strong>Quantity:</strong> {selectedProduct.productQuantity}</Typography>
                            <Typography><strong>Warehouse:</strong> {selectedProduct.warehouse?.warehouseName}</Typography>
                            <TextField
                            size="small"
                            placeholder="Quantity"
                            value={quantityUpdate}
                            onChange={(e) => setQuantityUpdate(e.target.value)}
                        />
                        </Stack>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}

                        
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    <Button onClick={() => updateQuantity()}>Update</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default QuantityAdjustment;
