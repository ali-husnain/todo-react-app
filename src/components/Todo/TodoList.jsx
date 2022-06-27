import React, { useState, useEffect, useContext } from "react";
import TodoContext from "../store/todo-context.js";

import {
  Paper,
  List,
  Modal,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import UpdateModal from "../Modals/Model.jsx";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { styled } from "@mui/material/styles";

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
    transition: "all 150ms",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
      transform: "scale(1.2)",
    },
    "&:active": {
      transform: "scale(0.9)",
    },
    backgroundColor: theme.palette.grey[50],
  }),
  ...(variant === "danger" && {
    color: "#fff",
    transition: "all 150ms",

    backgroundColor: theme.palette.error.light,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
      transform: "scale(1.2)",
    },
    "&:active": {
      transform: "scale(0.9)",
    },
    inset: theme.shadows[25],
  }),
  ...theme,
}));

function TodoList() {
  const [currTodo, setCurrTodo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todoCtx = useContext(TodoContext);

  const completeTodo = async (id) => {
    const data = await fetch(
      "https://mytodo-express-api.herokuapp.com/api/task/markcomplete",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${todoCtx.myToken}`,
        },
        body: JSON.stringify({ id: id }),
      }
    );
    fetchAllTodo();
  };
  const deleteTodo = async (id) => {
    const data = await fetch(
      `https://mytodo-express-api.herokuapp.com/api/task/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${todoCtx.myToken}`,
        },
        body: JSON.stringify({ id: id }),
      }
    );
    fetchAllTodo();
  };

  const fetchAllTodo = async () => {
    const data = await fetch(
      "https://mytodo-express-api.herokuapp.com/api/task/progress",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${todoCtx.myToken}`,
        },
      }
    );

    const response = await data.json();
    const inComplete = response.data.inprogress;
    const completed = response.data.completed;

    todoCtx.setAllTodo(inComplete);
    todoCtx.setCompletedTodo(completed);
  };

  const updateTodo = async (id, name) => {
    const data = fetch(
      "https://mytodo-express-api.herokuapp.com/api/task/update",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${todoCtx.myToken}`,
        },
        body: JSON.stringify({ id: id, name: name }),
      }
    );
  };

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const updateTodoHandler = async (id, updatedText) => {
    updateTodo(id, updatedText);
    fetchAllTodo();
  };

  return (
    <>
      <DisplayTodoList sx={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h2">All Todos</Typography>
        {currTodo && (
          <UpdateModal
            open={isModalOpen}
            item={currTodo}
            SetModal={setIsModalOpen}
            updateTodo={updateTodoHandler}
          />
        )}
        <List>
          {todoCtx.allTodos?.map((el) => (
            <ListItem key={el.id}>
              <ListItemText primary={el.name} />
              <ActionButton
                sx={{ marginRight: "10px" }}
                variant={"succcess"}
                onClick={() => completeTodo(el.id)}
              >
                <DoneIcon />
              </ActionButton>
              <ActionButton
                sx={{ marginRight: "10px" }}
                variant={"succcess"}
                onClick={() => {
                  setCurrTodo(el);
                  setIsModalOpen(true);
                }}
              >
                <EditIcon />
              </ActionButton>
              <ActionButton
                sx={{ marginRight: "10px" }}
                variant={"danger"}
                onClick={() => deleteTodo(el.id)}
              >
                <ClearIcon />
              </ActionButton>
            </ListItem>
          ))}
        </List>
      </DisplayTodoList>
      <DisplayTodoList sx={{ marginTop: "4rem" }}>
        <Typography sx={{ paddingLeft: 2, paddingTop: 2 }} variant="h4">
          Completed Todos
        </Typography>
        <List>
          {todoCtx.completedTodos?.map((el) => (
            <ListItem key={el.id}>
              <ListItemText primary={el.name} />
            </ListItem>
          ))}
        </List>
      </DisplayTodoList>
    </>
  );
}

export default TodoList;
