import React from 'react';
import Chart from 'react-google-charts';

export default function BarChart({ chartData, barColors }) {
  const options = {
    chart: {
      title: 'My Finance Chart',
      subtitle: 'Income and Expenses',
    },
    bars: 'vertical',
    colors: barColors,
    
  };

  return (
    <div className='bar-chart-container'>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
}
