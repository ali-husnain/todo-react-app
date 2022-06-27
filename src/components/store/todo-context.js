import React, { createContext, createRef } from "react";

const TodoContext = createContext({
  allTodos: [],
  addTodo: (todo) => {},
  updateTodo: (todo) => {},
  deleteTodo: (todoId) => {},
  isLoggedIn: false,
  loginHandler: (todo) => {},
  logOutHandler: (todo) => {},
  completedTodos: (todo) => {},
  completeTodoHandler: (todo) => {},
});

export default TodoContext;
