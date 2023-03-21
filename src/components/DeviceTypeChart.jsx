import { Bar } from 'react-chartjs-2';

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
    <Bar
      data={chartData}
      options={options}
    />
  );
};
export default DeviceTypeChart;
