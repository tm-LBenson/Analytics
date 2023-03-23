import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required elements and plugins
Chart.register(ArcElement, Title, Tooltip, Legend);
const DeviceTypeChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Device Types',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Device Types',
      },
      legend: {
        display: false,
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
export default DeviceTypeChart;
