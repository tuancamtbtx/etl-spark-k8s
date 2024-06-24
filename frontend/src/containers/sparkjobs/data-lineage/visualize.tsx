import React from 'react';
import { Card, Steps, List, Typography } from 'antd';
import { FileOutlined, SyncOutlined, SaveOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Text } = Typography;

const dataLineage = [
  {
    name: "Ingest",
    type: "source",
    format: "csv",
    options: {
      path: "/Users/tuan.nguyen3/Documents/Personal-Projects/spark-all-in-one/spark-build-tool/example/input.csv",
      header: "true",
      inferSchema: "true",
      delimiter: ",",
      encoding: "UTF-8"
    }
  },
  {
    name: "Transform",
    type: "transformation",
    operations: [
      { operation: "filter", condition: "age > 40" },
      { operation: "select", columns: ["name", "age", "address"] }
    ]
  },
  {
    name: "Sink",
    type: "write",
    format: "parquet",
    options: {
      path: "/Users/tuan.nguyen3/Documents/Personal-Projects/spark-all-in-one/spark-build-tool/example/output",
      mode: "overwrite"
    }
  }
];

const DataLineageVisualize = () => {
  return (
    <Card title="Data Lineage" style={{ width: '100%' }}>
      <Steps direction="vertical" current={3}>
        {dataLineage.map((step, index) => (
          <Step
            key={index}
            title={step.name}
            icon={
              step.type === 'source' ? <FileOutlined /> :
              step.type === 'transformation' ? <SyncOutlined /> :
              step.type === 'write' ? <SaveOutlined /> : null
            }
            description={
              <Card bordered>
                <Text strong>Type:</Text> {step.type}<br />
                <Text strong>Format:</Text> {step.format}<br />
                {step.options && (
                  <>
                    <Text strong>Options:</Text>
                    <List
                      size="small"
                      dataSource={Object.entries(step.options)}
                      renderItem={([key, value]) => (
                        <List.Item>
                          <Text code>{key}:</Text> {value.toString()}
                        </List.Item>
                      )}
                    />
                  </>
                )}
                {step.operations && (
                  <>
                    <Text strong>Operations:</Text>
                    <List
                      size="small"
                      dataSource={step.operations}
                      renderItem={(operation) => (
                        <List.Item>
                          <Text code>{operation.operation}:</Text> {JSON.stringify(operation)}
                        </List.Item>
                      )}
                    />
                  </>
                )}
              </Card>
            }
          />
        ))}
      </Steps>
    </Card>
  );
};

export default DataLineageVisualize;