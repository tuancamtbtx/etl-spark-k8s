'use client'

import AppLayout from '@/components/layout';

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Card } from 'antd'
import React, { PureComponent } from 'react';

import { HeartOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
  gaugeClasses
  
} from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };
  
export default async function Home() {
  return (
    <AppLayout activeMenuKey='dashboard'>

        <Card title="Dashboard">
        <Row gutter={16}>
    <Col span={8}>
      <Card bordered={false}>
        <Statistic
          title="Spark UI"
          value={'LIVE'}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<HeartOutlined />}
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
        <Statistic
          title="Spark Operator"
          value={'LIVE'}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<HeartOutlined />}
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
        <Statistic
          title="Spark Submit"
          value={'LIVE'}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<HeartOutlined />}
        />
      </Card>
    </Col>
  </Row>
  <Row gutter={16}>
        <Col span={8}>
      <Card bordered={false} title="Memory Usage">
      <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={30}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </GaugeContainer>
      </Card>
      
    </Col>
    <Col span={8}>
      <Card bordered={false} title="Disk Usage">
       <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={10}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </GaugeContainer>
      </Card>
      
    </Col>
    <Col span={8}>
      <Card bordered={false} title="CPU Usage">
      <GaugeContainer
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#52b202',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={5}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </GaugeContainer>
      </Card>
      
    </Col>
</Row>
        </Card>
    </AppLayout>
  );
}