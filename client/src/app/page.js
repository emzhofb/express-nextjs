"use client"
import { useState } from 'react';
import { SocketProvider } from '../contexts/SocketContext';
import TemperatureChart from '../components/TemperatureChart';

const Dashboard = () => {
  const [timezone, setTimezone] = useState('Asia/Jakarta');

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  return (
    <SocketProvider>
      <div className="dashboard">
        <h1>Real-Time Temperature Dashboard</h1>
        <div className="timezone-selector">
          <label htmlFor="timezone">Select Timezone: </label>
          <select id="timezone" value={timezone} onChange={handleTimezoneChange}>
            <option value="Asia/Jakarta">Asia/Jakarta</option>
            <option value="Asia/Singapore">Asia/Singapore</option>
            <option value="Australia/Sydney">Australia/Sydney</option>
          </select>
        </div>
        <TemperatureChart timezone={timezone} />
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
