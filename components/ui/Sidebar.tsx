import React from "react";
import {
  Typography,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  Drawer,
  Divider,
  Box,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useUIContext } from "@/context/ui";

const menuItem: string[] = ["Inbox", "Emails", "Products", "Config"];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useUIContext();

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuItem.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {menuItem.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
