import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { enqueueSnackbar } from "notistack";
import BackButton from "../../Components/BackButton";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // Holds category being edited

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      setCategories(response.data.category || []);
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
      await axios.post(`${import.meta.env.VITE_API_URL}/category`, { categoryName });
      setCategoryName("");
      setError("");
      fetchCategories();
      enqueueSnackbar("Category Added!", { variant: "success" });
    } catch (error) {
      setError("Error adding category");
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`);
      fetchCategories();
      enqueueSnackbar("Category Deleted!", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/${id}`);
      setEditCategory(response.data.category);
      setEditModalOpen(true);
      enqueueSnackbar("Category updated!", { variant: "success" });
    } catch (error) {
      console.error("Error fetching category:", error);
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCategory.categoryName.trim()) {
      setError("Category name is required");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/category/${editCategory._id}`, {
        categoryName: editCategory.categoryName,
      });
      setEditModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Box>
      <Stack  direction={'row'} alignItems={'center'}  spacing={1}>
        <BackButton />
      <Typography variant="h5" gutterBottom>
        Category Management
      </Typography>
      </Stack>
     
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
          backgroundColor: "#000000",
          "&:hover": { backgroundColor: "#333333" },
          fontSize: "0.8rem",
          textTransform: "none",
        }}
        variant="contained"
        onClick={handleAddCategory}
        size="small"
      >
        Add Category
      </Button>

      {/* Table */}
      <Stack sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat, index) => (
              <TableRow key={cat._id}>
                <TableCell sx={{ fontSize: "0.75rem" }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }}>{cat.categoryName}</TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }} align="right">
                  <IconButton color="error" size="small" onClick={() => handleDelete(cat._id)}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="primary" size="small" onClick={() => handleEdit(cat._id)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Category
          </Typography>
          <TextField
            label="Category Name"
            fullWidth
            size="small"
            value={editCategory?.categoryName || ""}
            onChange={(e) => setEditCategory({ ...editCategory, categoryName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
              size="small"
              onClick={handleUpdateCategory}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Category;
