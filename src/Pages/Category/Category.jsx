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
} from "@mui/material";

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
          mt: 2,
          backgroundColor: "#000000",
          "&:hover": { backgroundColor: "#333333" },
        }}
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
      <List>
        {categories.map((cat) => (
          <ListItem key={cat._id}>
            <ListItemText primary={cat.categoryName} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Category;
