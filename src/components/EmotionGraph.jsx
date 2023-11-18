import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const emotions = {
  happy: "😊",
  surprise: "😲",
  neutral: "😐",
  fear: "😨",
  sad: "😢",
};

const formatTime = (timestamp) => timestamp.split(" ")[1];

const emojiPlugin = {
  id: "emojiPlugin",
  afterDatasetsDraw: (chart, args, options) => {
    const { ctx, data } = chart;
    ctx.font = "24px Arial"; // Adjust the font size as needed

    data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((point, index) => {
        if (dataset.data[index] !== null) {
          // Skip drawing for empty data points
          const emoji = emotions[dataset.data[index]];
          const { x, y } = point.getCenterPoint();

          // Adjust the y-coordinate to move the emoji slightly down
          const textWidth = ctx.measureText(emoji).width;
          const textHeight = ctx.measureText("M").width; // Rough estimate of height
          ctx.fillText(emoji, x - textWidth / 2, y - textHeight / 2 + 10); // +10 is the adjustment
        }
      });
    });
  },
};

const MyChart = ({ data }) => {
  useEffect(() => {
    Chart.register(emojiPlugin);
  }, []);

  // Add null values to the beginning and end of your data arrays
  const paddedEmotions = [null, ...data.Emotion, null];
  const paddedTimeStamps = ["", ...data.TimeStamp.map(formatTime), ""];

  const chartData = {
    labels: paddedTimeStamps,
    datasets: [
      {
        label: "Emotions",
        data: paddedEmotions,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        // The pointStyle and pointRadius can be removed or kept, depending on whether you want a shape behind the emoji
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "category",
        labels: Object.keys(emotions),
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default MyChart;
