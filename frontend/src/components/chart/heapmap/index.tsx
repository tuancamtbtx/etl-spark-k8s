// HeatmapChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

const HeatmapChart: React.FC = () => {
  const options = {
    chart: {
      type: 'heatmap',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: '#00A100',
              name: 'low',
            },
            {
              from: 51,
              to: 100,
              color: '#128FD9',
              name: 'medium',
            },
            {
              from: 101,
              to: 150,
              color: '#FFB200',
              name: 'high',
            },
            {
              from: 151,
              to: 200,
              color: '#FF0000',
              name: 'extreme',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Heatmap Chart',
    },
  };

  const series = [
    {
      name: 'Metric1',
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric2',
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric3',
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric4',
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric5',
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric6',
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
  ];

  function generateData(count: number, yrange: { min: number; max: number }) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = `w${i + 1}`;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({ x, y });
      i++;
    }
    return series;
  }

  return (
    <div>
      {/* <Chart series={series} type="heatmap" height={350} /> */}
    </div>
  );
};

export default HeatmapChart;