import React, { useContext, useState, useEffect } from "react";
import TodoContext from "../store/todo-context";
import { Box, Button } from "@mui/material";
import Chart from "react-apexcharts";

function Dasboard() {
  const [progress, setProgress] = useState();
  const todoCtx = useContext(TodoContext);

  const options = {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: true,
      offsetX: 0,
      offsetY: 0,
      customScale: 1,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10,
      },
      donut: {
        size: "65%",
        background: "transparent",
        labels: {
          show: false,
          name: {
            show: true,
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
            formatter: function (val) {
              return val;
            },
          },
          value: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },
          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  };

  const series = [todoCtx.allTodos.length, todoCtx.completedTodos.length];
  
  const apiUrl = 'http://localhost:3000';

  const fetchAllTodo = async () => {
    const data = await fetch(
      `${apiUrl}/api/task/progress`,
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

  useEffect(() => {
    const fetchStats = async (id) => {
      const data = await fetch(
        `${apiUrl}/api/task/progress`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${todoCtx.myToken}`,
          },
        }
      );

      const res = await data.json();
      setProgress(res.data?.percentage);
    };
    fetchStats();
    fetchAllTodo();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", gap: 2, alignSelf: "flex-start" }}>
          <Button variant="contained" disableElevation>
            Today
          </Button>
          <Button variant="contained" disableElevation>
            Weekly
          </Button>
          <Button variant="contained" disableElevation>
            Monthly
          </Button>
        </Box>
        <Box>
          <Box>
            <Chart options={options} series={series} type="donut" width="300" />
          </Box>
        </Box>
        <Box></Box>
      </Box>
      <Box
        sx={{
          minWidth: "20rem",
          borderRadius: 10,
          height: "2rem",
          bgcolor: "gray",
        }}
      >
        <Box
          sx={{
            bgcolor: "success.main",
            width: `${progress}%`,
            height: "2rem",
            borderRadius: 10,
            textAlign: "center",
            color: "white",
          }}
        >
          {progress}% Completed
        </Box>
      </Box>
    </>
  );
}

export default Dasboard;
