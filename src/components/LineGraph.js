import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LineGraph = ({ data }) => {
  return (
    <ResponsiveContainer width='60%' height={400}>
      <label className='sub-title'>CSV輸出折線圖</label>
      <LineChart data={data}>
        <XAxis dataKey='tag_times' type='category' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='tag_value'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
