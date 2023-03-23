import React, { useMemo } from 'react';
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
import { useSelector } from 'react-redux';

// Register the required scales, elements, and plugins
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrafficChart = () => {
  const data = useSelector((state) => state.sites.sites);

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return {};

    const labels = data
      .flatMap((site) => site.traffic.map((t) => t.date))
      .filter((v, i, a) => a.indexOf(v) === i);
    labels.sort();

    const datasets = data.map((site) => ({
      label: site.name,
      data: labels.map((label) => {
        const traffic = site.traffic.find((t) => t.date === label);
        return traffic ? traffic.visits : 0;
      }),
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
      <div className="container chart-container">
        {chartData.labels && (
          <Bar
            data={chartData}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default TrafficChart;
