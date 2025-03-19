import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Home, Menu, Settings, Info } from "@mui/icons-material";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Home", icon: <Home /> },
    { text: "Settings", icon: <Settings /> },
    { text: "About", icon: <Info /> },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer} style={{ position: "fixed", left: 10, top: 10 }}>
        <Menu />
      </IconButton>
      <Drawer variant="permanent" open={open} style={{ width: open ? 240 : 60 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;