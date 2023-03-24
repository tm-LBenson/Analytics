import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDateIndex } from '../store/slices/dateIndex';
import { setDateIndex } from '../store/slices/dateIndex';
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
  const data = useSelector((state) => state.sites.sites);
  console.log(data);
  const dateIndex = useSelector((state) => state.dateIndex.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetDateIndex());
  }, []);
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return {};

    const labels = data
      .flatMap((site) => site.traffic.map((t) => t.date))
      .filter((v, i, a) => a.indexOf(v) === i);
    labels.sort((a, b) => new Date(b) - new Date(a));

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
  const handleChange = (event) => {
    const newIndex = chartData.labels.findIndex(
      (label) => label === event.target.value,
    );
    dispatch(setDateIndex(newIndex));
  };
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
      <label htmlFor="date">Date:</label>

      {chartData.labels && (
        <>
          <select
            id="date"
            value={chartData.labels[dateIndex]}
            onChange={handleChange}
          >
            {chartData.labels.map((label) => (
              <option
                key={label}
                value={label}
              >
                {new Date(label).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  timeZone: 'UTC',
                })}
              </option>
            ))}
          </select>
          <div className="container chart-container">
            <Bar
              data={{
                labels: [chartData.labels[dateIndex]],
                datasets: chartData.datasets.map((dataset) => ({
                  ...dataset,
                  data: [dataset.data[dateIndex]],
                })),
              }}
              options={options}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TrafficChart;
