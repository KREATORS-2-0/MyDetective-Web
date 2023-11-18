import React from "react";
import { Line } from "react-chartjs-2";

const EEGChart = ({ data }) => {
  // Extracting timestamps and channel data
  const timestamps = data.map((item) =>
    new Date(item["Timestamp"] * 1000).toLocaleTimeString()
  );
  const validateData = (data) => data.map((item) => item ?? 0);

  const channel1 = validateData(data.map((item) => item["EXG Channel 1"]));
  const channel2 = validateData(data.map((item) => item["EXG Channel 2"]));
  const channel3 = validateData(data.map((item) => item["EXG Channel 3"]));
  const channel4 = validateData(data.map((item) => item["EXG Channel 4"]));

  // Chart data
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "EXG Channel 1",
        data: channel1,
        borderColor: "red",
        borderWidth: 1,
      },
      {
        label: "EXG Channel 2",
        data: channel2,
        borderColor: "blue",
        borderWidth: 1,
      },
      {
        label: "EXG Channel 3",
        data: channel3,
        borderColor: "green",
        borderWidth: 1,
      },
      {
        label: "EXG Channel 4",
        data: channel4,
        borderColor: "yellow",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      datalabels: {
        display: false, // This will turn off data labels globally
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "second",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 20, // Adjust for better scaling
            fontSize: 10, // Adjust font size for x-axis labels
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontSize: 10, // Adjust font size for y-axis labels
          },
        },
      ],
    },
    elements: {
      point: {
        radius: 0, // You can also adjust radius to control point size
        pointStyle: "circle", // Explicitly define point style
      },
    },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, chart) {
          let label = chart.datasets[tooltipItem.datasetIndex].label || "";
          if (label) {
            label += ": ";
          }
          label += tooltipItem.yLabel !== undefined ? tooltipItem.yLabel : "";
          return label;
        },
      },
      bodyFontSize: 10, // Adjust tooltip text size
      titleFontSize: 12, // Adjust tooltip title size
    },
  };

  return <Line data={chartData} options={options} />;
};

export default EEGChart;
