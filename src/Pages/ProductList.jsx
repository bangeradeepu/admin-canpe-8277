import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
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
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );
      setProducts(response.data.products); // Ensure your API returns an object with `products`
      console.log(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      console.log('Success Deleted', response);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>
      
        <Table sx={{fontSize:12}}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Images</strong>
              </TableCell>
              <TableCell>
                <strong>Product Name</strong>
              </TableCell>
              <TableCell>
                <strong>Cost</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell>
                <strong>Warehouse</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img width={50} src={product.productImage} alt="" />
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>₹{product.productCost}</TableCell>
                  <TableCell>₹{product.productPrice}</TableCell>
                  <TableCell>{product.productQuantity}</TableCell>
                  <TableCell>{product.warehouse}</TableCell>
                  <TableCell>
                    <DeleteIcon onClick={() => handleDelete(product._id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      
    </Box>
  );
};

export default ProductList;
