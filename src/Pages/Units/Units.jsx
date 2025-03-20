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

const Units = () => {
  const [unitName, setUnitName] = useState("");
  const [unit, setUnit] = useState([]);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUnit, setEditUnit] = useState(null); // Holds category being edited

  useEffect(() => {
    fetchUnit();
  }, []);

  const fetchUnit = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/units`);
      setUnit(response.data.units || []);
    } catch (error) {
      setError("Error fetching units");
    }
  };

  const handleAddUnit = async () => {
    if (!unitName.trim()) {
      setError("unit name is required");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/units`, { unitName });
      setUnitName("");
      setError("");
      fetchUnit();
    } catch (error) {
      setError("Error adding units");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/units/${id}`);
      fetchUnit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/units/${id}`);
      setEditUnit(response.data.units);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const handleUpdateUnit = async () => {
    if (!editUnit.unitName.trim()) {
      setError("Unit name is required");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/units/${editUnit._id}`, {
        unitName: editUnit.unitName,
      });
      setEditModalOpen(false);
      fetchUnit();
    } catch (error) {
      console.error("Error updating units:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Unit Management
      </Typography>
      <TextField
        label="Unit Name"
        variant="outlined"
        fullWidth
        size="small"
        value={unitName}
        onChange={(e) => setUnitName(e.target.value)}
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
        onClick={handleAddUnit}
        size="small"
      >
        Add Unit
      </Button>

      {/* Table */}
      <Stack sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>Unit name</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unit.map((uni, index) => (
              <TableRow key={uni._id}>
                <TableCell sx={{ fontSize: "0.75rem" }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }}>{uni.unitName}</TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }} align="right">
                  <IconButton color="error" size="small" onClick={() => handleDelete(uni._id)}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="primary" size="small" onClick={() => handleEdit(uni._id)}>
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
            Edit Unit
          </Typography>
          <TextField
            label="Unit Name"
            fullWidth
            size="small"
            value={editUnit?.unitName || ""}
            onChange={(e) => setEditUnit({ ...editUnit, unitName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
              size="small"
              onClick={handleUpdateUnit}
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

export default Units;
