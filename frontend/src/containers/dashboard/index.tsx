// "use client";
import { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Bar ,Line,Pie} from '@ant-design/charts';
import PieChart from '@/components/chart/pie-chart';
import { Card, Col, Row, Statistic } from 'antd';
import Clearfix from '@/components/element/clearfix';
import CustomStatistic from '@/components/chart/statistic';
import ReactFrappeChart from "react-frappe-charts";

const etlJobsData = [
  { date: '2024-06-01', jobs: 5 },
  { date: '2024-06-02', jobs: 6 },
  { date: '2024-06-03', jobs: 7 },
  { date: '2024-06-04', jobs: 8 },
  { date: '2024-06-05', jobs: 5 },
];

const totalCostData = [
  { date: '2024-06-01', cloud: 'Azure', cost: 300 },
  { date: '2024-06-01', cloud: 'AWS', cost: 400 },
  { date: '2024-06-01', cloud: 'GCP', cost: 350 },
  { date: '2024-06-02', cloud: 'Azure', cost: 320 },
  { date: '2024-06-02', cloud: 'AWS', cost: 420 },
  { date: '2024-06-02', cloud: 'GCP', cost: 360 },
  { date: '2024-06-03', cloud: 'Azure', cost: 310 },
  { date: '2024-06-03', cloud: 'AWS', cost: 430 },
  { date: '2024-06-03', cloud: 'GCP', cost: 370 },
  // Add more data as needed
];

const dataDivision = [
  { type: 'Division A', value: 300 },
  { type: 'Division B', value: 50 },
  { type: 'Division C', value: 100 },
];

const dataProduct = [
  { type: 'Product X', value: 200 },
  { type: 'Product Y', value: 150 },
  { type: 'Product Z', value: 100 },
];

const dataCountry = [
  { type: 'USA', value: 400 },
  { type: 'Canada', value: 300 },
  { type: 'VietNam', value: 300 },
  { type: 'Mexico', value: 200 },
];

const dataCloud = [
  { type: 'AWS', value: 500 },
  { type: 'Azure', value: 300 },
  { type: 'Datadog', value: 300 },

  { type: 'GCP', value: 200 },
];

const Dashboard: React.FC = () => {
  // const [etlJobsData, setEtlJobsData] = useState([]);
  // const [jobsData, setJobsData] = useState([]);
  // useEffect(() => {
  //   // Fetch data here
  //   setEtlJobsData(etlJobsData);
  //   setJobsData(jobsData);

  // }, []);
    // Cấu hình cho biểu đồ total cost
    const totalCostConfig = {
      data: totalCostData,
      xField: 'date',
      yField: 'cost',
      seriesField: 'cloud',
      color: ['#1979C9', '#D62A0D', '#FAA219'],
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
    };
    const etlJobsConfig = {
      data: etlJobsData,
      xField: 'date',
      yField: 'jobs',
      seriesField: 'date',
      color: '#1979C9',
      label: {
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
    };
  return (
    <>
     
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <CustomStatistic title="Total Account AWS" value={23} logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/1024px-AWS_Simple_Icons_AWS_Cloud.svg.png" />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <CustomStatistic title="Total Subscription Azure" value={14} logo="data:image/png;base64,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" />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <CustomStatistic title="Total Projects GCP" value={167} logo="https://static-00.iconduck.com/assets.00/google-cloud-icon-1024x823-wiwlyizc.png" />
          </Card>
        </Col>
      </Row>
      <Clearfix height={32} />
   
      <Card title="Total Summary">
        <Row gutter={12}>
            <Col span={12}>
            </Col>
          {/* <Col span={6}>
              <PieChart data={dataProduct} title="Product" />
          </Col>
          <Col span={6}>
              <PieChart data={dataCountry} title="Country" />
          </Col>
          <Col span={6}>
              <PieChart data={dataCloud} title="Cloud" />
          </Col> */}
        </Row>
      </Card>
    </>
  );
}
export default Dashboard