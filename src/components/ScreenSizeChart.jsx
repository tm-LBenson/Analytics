import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required elements and plugins
Chart.register(ArcElement, Title, Tooltip, Legend);



const ScreenSizeChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.size),
    datasets: [
      {
        label: 'Screen Sizes',
        data: data.map((d) => d.count),
        backgroundColor: data.map(
          () =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256,
            )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Screen Sizes',
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <Pie
      data={chartData}
      options={options}
    />
  );
};

export default ScreenSizeChart;
