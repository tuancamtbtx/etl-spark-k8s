import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { Line, Pie } from '@ant-design/charts';

interface JobStatus {
  running: number;
  completed: number;
  failed: number;
}

interface JobDuration {
  time: string;
  duration: number;
}

interface Metrics {
  jobStatus: JobStatus;
  jobDuration: JobDuration[];
}

const fetchSparkMetrics = async (): Promise<Metrics> => {
  // Replace this with actual API calls to fetch metrics
  return {
    jobStatus: {
      running: 5,
      completed: 20,
      failed: 2,
    },
    jobDuration: [
      { time: '2024-06-21', duration: 120 },
      { time: '2024-06-22', duration: 150 },
      { time: '2024-06-23', duration: 90 },
      { time: '2024-06-24', duration: 180 },
    ],
  };
};

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchSparkMetrics();
      setMetrics(data);
    };
    getMetrics();
  }, []);

  if (!metrics) {
    return <Spin size="large" />;
  }

  const jobStatusData = [
    { type: 'Running', value: metrics.jobStatus.running },
    { type: 'Completed', value: metrics.jobStatus.completed },
    { type: 'Failed', value: metrics.jobStatus.failed },
  ];

  const jobDurationConfig = {
    data: metrics.jobDuration,
    xField: 'time',
    yField: 'duration',
    point: { size: 5, shape: 'diamond' },
    label: { style: { fill: '#aaa' } },
  };

  const jobStatusConfig = {
    appendPadding: 10,
    data: jobStatusData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: { fill: '#fff', fontSize: 14, textAlign: 'center' },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Running Jobs"
              value={metrics.jobStatus.running}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Completed Jobs"
              value={metrics.jobStatus.completed}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Failed Jobs"
              value={metrics.jobStatus.failed}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="Job Status">
            <Pie {...jobStatusConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Job Duration Over Time">
            <Line {...jobDurationConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;