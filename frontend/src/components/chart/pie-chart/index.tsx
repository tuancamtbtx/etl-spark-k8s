// components/PieChart.tsx
import React from 'react';
import { Pie } from '@ant-design/charts';

interface PieChartProps {
  data: { type: string; value: number }[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const config = {
    width: 200,
    height: 200,
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  return (
    <div>
      <h3>{title}</h3>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;