import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Table,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    IconButton
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const API_URL = `${import.meta.env.VITE_API_URL}/category`;

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data.category);
    } catch (error) {
      setError("Error fetching categories");
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }
    try {
      await axios.post(API_URL, { categoryName });
      setCategoryName("");
      setError("");
      fetchCategories();
    } catch (error) {
      setError("Error adding category");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>
      <TextField
        label="Category Name"
        variant="outlined"
        fullWidth
        size="small"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />
      <Button
        sx={{
          mt: 1,
          backgroundColor: "#000000",
          "&:hover": { backgroundColor: "#333333" },
        }}
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat, index) => (
            <TableRow key={cat._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{cat.categoryName}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                  <EditOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default Category;
