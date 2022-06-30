import { useContext, useState } from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import TodoContext from "../store/todo-context";
import { styled } from "@mui/material/styles";

import React from "react";
import { motion } from "framer-motion";

const apiUrl = 'http://localhost:3000';

const FormInput = styled(TextField)(({ theme }) => ({
  "& ::after": {
    borderBottom: `2px solid ${theme.palette.warning.light} !important`,
  },
}));

function Form() {
  const todoCtx = useContext(TodoContext);
  const [haveAccount, setHaveAccount] = useState(true);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const sendCredentials = async (username, email, password) => {
    const data = await fetch(
      `${apiUrl}/api/auth/${
        haveAccount ? `signin` : `signup`
      }`,
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: haveAccount
          ? JSON.stringify({ username: username, password: password })
          : JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
      }
    );

    const res = await data.json();
    if (res.code === 200) {
      todoCtx.setIsLoggedIn(true);
      localStorage.setItem("myTodoToken", res.data.accessToken);
      todoCtx.setMyToken(res.data.accessToken);
    } else {
      todoCtx.setIsLoggedIn(false);
    }
  };

  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transiton={{ duration: 5 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(47, 57, 79)",
        zIndex: "1000",

        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "40rem",
          gap: "20px",
          margin: "auto",
        }}
      >
        <FormInput
          variant="standard"
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!haveAccount && (
          <FormInput
            variant="standard"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <FormInput
          variant="standard"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          disableElevation
          color="warning"
          onClick={() => {
            sendCredentials(username, email, password);
          }}
        >
          {haveAccount ? "Log In" : "Sign Up"}
        </Button>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => setHaveAccount((prev) => !prev)}
        >
          {" "}
          {haveAccount
            ? "Don't Have Account ? Sign Up"
            : " Already Have Account ! Login "}{" "}
        </Typography>
      </Box>
    </motion.div>
  );
}

export default Form;
