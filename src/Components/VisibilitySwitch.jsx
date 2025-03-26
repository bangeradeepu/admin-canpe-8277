import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const VisibilitySwitch = ({ productId, initialVisibility, reloadContent }) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const handleToggle = async () => {
    try {
      const newVisibility = !isVisible;
      setIsVisible(newVisibility);

      await axios.patch(`${import.meta.env.VITE_API_URL}/products/visibility/${productId}`, {
        isVisible: newVisibility,
      });
      reloadContent();
      enqueueSnackbar("Product Status Updated!", { variant: "success" });
    } catch (error) {
      console.error("Error updating product visibility:", error);
    }
  };

  return <Switch checked={isVisible} onChange={handleToggle} size="small" color="success" />;
};

export default VisibilitySwitch;
