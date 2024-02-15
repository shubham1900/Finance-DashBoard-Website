import React from "react";
import { Chart } from "react-google-charts";

export default function PieChart({ chartData }) {
  const options = {
    title: "Expenses Overview",
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}