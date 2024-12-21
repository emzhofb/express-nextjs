// components/TemperatureChart.js
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,  // Import PointElement
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'; // Import the necessary elements
import { useSocket } from '../contexts/SocketContext';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,  // Register PointElement
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const TemperatureChart = ({ timezone }) => {
  const { data } = useSocket();

  // Convert the timestamps to the selected timezone
  const formatDataForChart = () => {
    return data.map((entry) => {
      const date = new Date(entry.created_at);
      // Adjust the date to the selected timezone (not an exact conversion but an example)
      date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);
      return {
        x: date,
        y: entry.value,
      };
    });
  };

  const chartData = {
    datasets: [
      {
        label: 'Temperature (°C)',
        data: formatDataForChart(),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Temperature Data</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time', // Use time scale
              title: { display: true, text: 'Time (5-second intervals)' },
            },
            y: {
              title: { display: true, text: 'Temperature (°C)' },
            },
          },
        }}
      />
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time', // Use time scale
              title: { display: true, text: 'Time (5-second intervals)' },
            },
            y: {
              title: { display: true, text: 'Temperature (°C)' },
            },
          },
        }}
      />
    </div>
  );
};

export default TemperatureChart;
