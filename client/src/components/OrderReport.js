import React, { useState } from 'react';
import axios from 'axios';

const OrderReport = () => {
  const [reportData, setReportData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/orders/report', {
        startDate,
        endDate,
      });

      setReportData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Order Report</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
        <button type="submit">Generate Report</button>
      </form>
      {reportData && (
        <div>
          <p>Total Revenue: {reportData.totalRevenue}</p>
          <p>Total Orders: {reportData.totalOrders}</p>
        </div>
      )}
    </div>
  );
};

export default OrderReport;
