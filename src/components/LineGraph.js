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
    <ResponsiveContainer width='85%' height={400}>
      <p className='sub-title'>CSV輸出折線圖</p>
      <LineChart data={data}>
        <XAxis
          dataKey='tag_created_at'
          type='category'
          domain={['dataMin', 'dataMax']}
        />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='tag_value'
          stroke='#2563eb'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
