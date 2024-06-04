'use client'

import AppLayout from '@/components/layout';

import { Space, Table, Tag,Button } from 'antd';
import type { TableProps } from 'antd';
import { Card } from 'antd'

interface DataType {
    key: string;
    name: string;
    type: string;
    status: string;
    tags: string[];
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
        title: 'No',
        dataIndex: 'key',
        key: 'key',
        render: (key) => <a>{key}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Database Type',
        dataIndex: 'type',
        key: 'type',
        render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 3 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },  
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => {
            if(status === 'Success'){
                return <Button type="primary">{status}</Button>
            }
            return <Button danger type="primary">{status}</Button>
        }
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'EKYC_India_DB',
      type: 'MySQL',
      status: 'Failed',
      tags: ['prod', 'AGI'],
    },
    {
      key: '2',
      name: 'EKYC_VietNam_DB',
      type: 'MySQL',
      status: 'Success',
      tags: ['dev'],
    },
    {
      key: '3',
      name: 'DOP_VietNam_DB',
      type: 'Postgres',
      status: 'Success',
      tags: ['prod', 'DOP'],
    },
  ];

export default async function Home() {
  return (
    <AppLayout activeMenuKey='sources'>
        <Card title="Sources" extra={<Button type="primary">Create</Button>}>
        <Table columns={columns} dataSource={data} />
        </Card>
    </AppLayout>
  );
}