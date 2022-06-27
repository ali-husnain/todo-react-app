import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";
import TodoContext from "../store/todo-context";

import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
function DesktopMenuList(props) {
  const todoCtx = useContext(TodoContext);
  const menuList = [
    { name: "Dashboard", icon: DonutSmallIcon, to: "/" },
    { name: "All Todo", icon: PlaylistAddCheckIcon, to: "/Todo" },
    { name: "Add New Todo", icon: AddIcon, to: "/AddTodo" },
  ];
  let activeStyle = {
    textDecoration: "none",
    color: "#ffc148",
  };

  let activeClassName = {
    textDecoration: "none",
    color: "grey",
  };

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          minWidth: "20rem",
          borderRadius: 10,
        }}
      >
        <List
          sx={{ display: "flex", flexDirection: "column", height: "40rem" }}
        >
          {menuList?.map((listItem) => (
            <NavLink
              to={listItem.to}
              style={({ isActive }) =>
                isActive ? activeStyle : activeClassName
              }
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{<listItem.icon />}</ListItemIcon>
                  <ListItemText primary={listItem.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
          <ListItem sx={{ flexGrow: 1 }}>
            <ListItemButton
              onClick={() => {
                todoCtx.setIsLoggedIn(false);
                todoCtx.setMyToken("");
                localStorage.removeItem("myTodoToken");
              }}
              sx={{
                alignSelf: "flex-end",
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "red" }} />
                <ListItemText sx={{ color: "red" }} primary={"Log Out"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </motion.div>
  );
}

export default DesktopMenuList;
