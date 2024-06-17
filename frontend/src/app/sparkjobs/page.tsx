'use client'

import AppLayout from '@/components/layout';

import { Space, Table, Tag,Button ,Switch,Avatar, Divider} from 'antd';
import type { TableProps } from 'antd';
import { Card } from 'antd'
import Backfill from '@/containers/sparkjobs/backfill'
import YamlFile from '@/containers/sparkjobs/yaml'
import RemoveSparkJob from '@/containers/sparkjobs/delelte'
interface DataType {
    key: string;
    name: string;
    source: string;
    srcUrl?: string;
    destination: string;
    destUrl?: string;
    status: string;
    executor: string;
    frequency: string;
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
        title: 'No',
        dataIndex: ['key'],
        key: 'key',
        render: (key) => <a>{key}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
      {
        title: 'FREQUENCY',
        dataIndex: 'frequency',
        key: 'frequency',
        render: frequency => (
            <a>{frequency}</a>
        )
      },
      {
        title: 'ENABLED',
        dataIndex: 'status',
        key: 'status',
        render: status => (
            <Switch defaultChecked/>
        )
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <YamlFile/>
          <Divider type="vertical"/>
          <Backfill></Backfill>
          <Divider type="vertical"/>
          <RemoveSparkJob />
        </Space>
      ),
    },

  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'Clean Data From Postgres',
      source: 'Postgres',
      executor: 'Kubernetes',
      srcUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png',
      destination: 'Pub/Sub',
      destUrl: "https://assets-global.website-files.com/625540b970bc1b4035617258/626a7bbfb11ca86126daf99b_5fc5067732c4f5a49d4bdf34_1200px-Cloud-Pub-Sub-Logo.jpeg",
      status: 'Runing',
      frequency: 'Stream',
    },
    {
      key: '2',
      name: 'Clean Data From Bigquery',
      source: 'Bigquery',
      executor: 'Cloud Run',
      srcUrl: "https://assets-global.website-files.com/5f8b0a1abe69652278dad51c/60ad30603ce79d2498f80739_google%20bigquery%20logo.png",
      destination: 'Google Sheet',
      destUrl: "https://www.clicdata.com/wp-content/uploads/2023/04/google-sheets-logo.jpg",
      status: 'Runing',
      frequency: 'Schedule',
    },
    {
      key: '3',
      name: 'Clean Data from MySQL',
      source: 'MySQL',
      executor: 'Cloud Run',
      srcUrl:"https://connectors.airbyte.com/files/metadata/airbyte/source-mysql/latest/icon.svg",
      destination: 'BigQuery',
      destUrl: "https://assets-global.website-files.com/5f8b0a1abe69652278dad51c/60ad30603ce79d2498f80739_google%20bigquery%20logo.png",
      frequency: 'Manual',
      status: 'Runing',
    },
  ];

export default async function Home() {
  return (
    <AppLayout activeMenuKey='sparkjobs'>
        <Card title="Spark Jobs" extra={<Button type="primary">Create</Button>}>
        <Table columns={columns} dataSource={data} />
        </Card>
    </AppLayout>
  );
}