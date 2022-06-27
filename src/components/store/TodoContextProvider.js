import React, { useState } from "react";
import TodoContext from "./todo-context";

export default function TodoConTextProvider(props) {
  const [allTodo, setAllTodo] = useState([]);
  const [completedTodos, setCompletedTodo] = useState([]);
  const [myToken, setMyToken] = useState(() =>
    localStorage.getItem("myTodoToken")
      ? localStorage.getItem("myTodoToken")
      : null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(myToken ? true : false);

  const ctx = {
    allTodos: allTodo,
    setAllTodo: setAllTodo,
    myToken: myToken,
    setIsLoggedIn: setIsLoggedIn,
    setMyToken: setMyToken,
    isLoggedIn: isLoggedIn,
    completedTodos: completedTodos,
    setCompletedTodo: setCompletedTodo,
  };
  return (
    <TodoContext.Provider value={ctx}>{props.children}</TodoContext.Provider>
  );
}
