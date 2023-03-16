import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required scales, elements, and plugins
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrafficChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('traffic.json');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const chartData = React.useMemo(() => {
    if (!data.sites) return {};

    const labels = Object.keys(data.dailyTotal);
    const datasets = data.sites.map((site) => ({
      label: site.name,
      data: labels.map((label) => site.traffic[label] || 0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
    }));

    return {
      labels,
      datasets,
    };
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Daily Traffic',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h2>Daily Traffic</h2>
      {chartData.labels && (
        <Bar
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
};

export default TrafficChart;
