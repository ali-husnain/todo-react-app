import React, { useState, useContext, useEffect, useCallback } from "react";
import TodoContext from "../store/todo-context.js";
import {
  Paper,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const apiUrl = 'http://localhost:3000';

const DisplayTodoList = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2F394F",
  color: "white",
}));

const ActionButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant, theme }) => ({
  cursor: "pointer",
  ...(variant === "succcess" && {
    color: theme.palette.success.light,
    inset: theme.shadows[24],

    backgroundColor: theme.palette.grey[50],
  }),
  ...(variant === "danger" && {
    color: "#fff",
    backgroundColor: theme.palette.error.light,
    inset: theme.shadows[25],
  }),
  ...theme,
}));

function AddTodo() {
  const [AllTodo, setAllTodo] = useState();
  const [todoValue, setTodoValue] = useState("");
  const todoCtx = useContext(TodoContext);

  const createTodo = async (name) => {
    const data = fetch(
      `${apiUrl}/api/task/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${todoCtx.myToken}`,
        },
        body: JSON.stringify({ name: name }),
      }
    );
    setTodoValue("");
  };

  return (
    <DisplayTodoList sx={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h2">Add New Todo</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <TextField
          sx={{
            "& ::after": {
              borderBottom: `2px solid red !important`,
            },
          }}
          variant="standard"
          label="Add New Todo"
          value={todoValue}
          onChange={(e) => {
            setTodoValue(e.target.value);
          }}
        />
        <Button
          variant="contained"
          disableElevation
          onClick={() => createTodo(todoValue)}
          color="warning"
        >
          Add Todo
        </Button>
      </Box>
    </DisplayTodoList>
  );
}

export default AddTodo;
