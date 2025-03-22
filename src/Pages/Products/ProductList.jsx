import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  const handleViewProduct = (id) => {
    navigate(`/viewProduct/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );
      setProducts(response.data.products || []);
      console.log(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      console.log("Success Deleted", response);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack p={1}>
      <Typography variant="h6">
        Product List
      </Typography>

    
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
            {products?.length > 0 ? (
              products.map((product, index) => (
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
                    <DeleteIcon  fontSize="small" onClick={() => handleDelete(product._id)} sx={{ cursor: "pointer",color:'#2e2e2e' }} />
                      <VisibilityOutlinedIcon fontSize="small" sx={{cursor:'pointer',color:'#2e2e2e'}} onClick={(e) => handleViewProduct(product._id)} />
                      <DriveFileRenameOutlineOutlinedIcon fontSize="small"sx={{cursor:'pointer',color:'#2e2e2e'}} />
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
     
    </Stack>
  );
};

export default ProductList;
