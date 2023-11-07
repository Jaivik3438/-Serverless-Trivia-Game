import React, { useState } from "react";
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
} from "@mui/material";
import { Bar, Pie, Line, Doughnut, Radar } from "react-chartjs-2";
import "chart.js/auto";

const UserStatistics = () => {
  const [chartType1, setChartType1] = useState("bar");
  const [chartType2, setChartType2] = useState("pie");
  // Sample data for user statistics
  const userStatistics = {
    gamesPlayed: 50,
    gamesWon: 30,
    gamesLost: 20,
    totalPoints: 1500,
  };

  const handleChartTypeChange1 = (event) => {
    setChartType1(event.target.value);
  };

  const handleChartTypeChange2 = (event) => {
    setChartType2(event.target.value);
  };

  const chartData = {
    labels: ["Games Played", "Games Won", "Games Lost", "Total Points"],
    datasets: [
      {
        label: "User Statistics",
        data: [
          userStatistics.gamesPlayed,
          userStatistics.gamesWon,
          userStatistics.gamesLost,
          userStatistics.totalPoints,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const pieChartData = {
    labels: ["Games Won", "Games Lost"],
    datasets: [
      {
        data: [userStatistics.gamesWon, userStatistics.gamesLost],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Games Won", "Games Lost"],
    datasets: [
      {
        data: [userStatistics.gamesWon, userStatistics.gamesLost],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
      },
    ],
  };

  const lineChartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Total Points",
        data: [100, 200, 300, 400, 500],
        borderColor: "rgba(255, 99, 132, 0.6)",
        fill: false,
      },
    ],
  };

  const radarChartData = {
    labels: ["Speed", "Power", "Agility", "Accuracy", "Endurance"],
    datasets: [
      {
        label: "User Statistics",
        data: [90, 80, 70, 85, 95],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <CommonNavbar />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Chart 1</Typography>
            <FormControl variant="outlined" style={{ marginTop: "10px" }}>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartType1}
                onChange={handleChartTypeChange1}
                label="Chart Type"
              >
                <MenuItem value="bar">Bar Chart</MenuItem>
                <MenuItem value="line">Line Chart</MenuItem>
                <MenuItem value="radar">Radar Chart</MenuItem>
                {/* Add your additional chart types here */}
              </Select>
            </FormControl>
            {chartType1 === "bar" && (
              <Bar data={chartData} options={chartOptions} />
            )}
            {chartType1 === "line" && (
              <Line data={lineChartData} options={chartOptions} />
            )}
            {chartType1 === "radar" && (
              <Radar data={radarChartData} options={chartOptions} />
            )}
            {/* Add additional charts here */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Chart 2</Typography>
            <FormControl variant="outlined" style={{ marginTop: "10px" }}>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartType2}
                onChange={handleChartTypeChange2}
                label="Chart Type"
              >
                <MenuItem value="pie">Pie Chart</MenuItem>
                <MenuItem value="doughnut">Doughnut Chart</MenuItem>
                {/* Add your additional chart types here */}
              </Select>
            </FormControl>
            {chartType2 === "pie" && <Pie data={pieChartData} />}
            {chartType2 === "doughnut" && <Doughnut data={doughnutChartData} />}
            {/* Add additional charts here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserStatistics;
