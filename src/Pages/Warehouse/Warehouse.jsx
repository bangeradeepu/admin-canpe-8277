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

const Warehouse = () => {
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState(null); // Holds category being edited

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/warehouse`);
      setWarehouse(response.data.warehouse || []);
    } catch (error) {
      setError("Error fetching warehouse");
    }
  };

  const handleAddWarehouse = async () => {
    if (!warehouseName.trim()) {
      setError("warehouse name is required");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/warehouse`, { warehouseName });
      setWarehouseName("");
      setError("");
      fetchWarehouse();
      enqueueSnackbar("Warehouse Added!", { variant: "success" });
    } catch (error) {
      setError("Error adding warehouse");
      enqueueSnackbar("Something went wrong!", { variant: "success" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/warehouse/${id}`);
      fetchWarehouse();
      enqueueSnackbar("Warehouse Deleted!", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong!", { variant: "success" });
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/warehouse/${id}`);
      setEditWarehouse(response.data.warehouse);
      setEditModalOpen(true);
      enqueueSnackbar("Warehouse Updated!", { variant: "success" });
    } catch (error) {
      console.error("Error fetching warehouse:", error);
      enqueueSnackbar("Something went wrong!", { variant: "success" });
    }
  };

  const handleUpdateWarehouse = async () => {
    if (!editWarehouse.warehouseName.trim()) {
      setError("warehouse name is required");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/warehouse/${editWarehouse._id}`, {
        warehouseName: editWarehouse.warehouseName,
      });
      setEditModalOpen(false);
      fetchWarehouse();
    } catch (error) {
      console.error("Error updating warehouse:", error);
    }
  };

  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'}  spacing={1}>
        <BackButton />
      <Typography sx={{fontSize:20,fontWeight:500}} gutterBottom>
        Warehouse Management
      </Typography>
      </Stack>
    
      <TextField
        label="Warehouse Name"
        variant="outlined"
        fullWidth
        size="small"
        value={warehouseName}
        onChange={(e) => setWarehouseName(e.target.value)}
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
        onClick={handleAddWarehouse}
        size="small"
      >
        Add Warehouse
      </Button>

      {/* Table */}
      <Stack sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>Warehouse</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouse.map((war, index) => (
              <TableRow key={war._id}>
                <TableCell sx={{ fontSize: "0.75rem" }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }}>{war.warehouseName}</TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }} align="right">
                  <IconButton color="error" size="small" onClick={() => handleDelete(war._id)}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="primary" size="small" onClick={() => handleEdit(war._id)}>
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
            Edit Warehouse
          </Typography>
          <TextField
            label="Warehouse Name"
            fullWidth
            size="small"
            value={editWarehouse?.warehouseName || ""}
            onChange={(e) => setEditWarehouse({ ...editWarehouse, warehouseName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
              size="small"
              onClick={handleUpdateWarehouse}
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

export default Warehouse;
