import React, { useState } from "react";
import TodoContext from "./todo-context";

export default function TodoConTextProvider(props) {
  const [allTodo, setAllTodo] = useState([]);
  const [completedTodos, setCompletedTodo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const addTodoHandler = (todo) => {
  //   setAllTodo([...allTodo, todo]);
  // };

  // const updateTodoHandler = (todo) => {
  //   const todoIndex = allTodo.findIndex((el) => el.id === todo.id);
  //   const newStateSnapshot = allTodo;
  //   newStateSnapshot[todoIndex].name = todo.name;
  //   setAllTodo(newStateSnapshot);
  // };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };
  const logOutHandler = () => {
    setIsLoggedIn(false);
  };

  const ctx = {
    allTodos: allTodo,
    setAllTodo: setAllTodo,
    // addTodo: addTodoHandler,
    // deleteTodo: deleteTodoHandler,
    // updateTodo: updateTodoHandler,
    isLoggedIn: isLoggedIn,
    loginHandler: loginHandler,
    logOutHandler: logOutHandler,
    completedTodos: completedTodos,
    setCompletedTodo: setCompletedTodo,
  };
  return (
    <TodoContext.Provider value={ctx}>{props.children}</TodoContext.Provider>
  );
}
