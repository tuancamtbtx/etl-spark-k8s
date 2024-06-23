import React, { useState } from 'react';

import { Drawer, Button } from 'antd'

import FormBackfill from './editor'

const content = `
apiVersion: "v1"
kind: SparkBatchPipeline
spec:
  jobName: "ExampleSparkJob"
  master: "local[*]"
  appName: "Spark Ingest Transform Sink Job"
  javaClass: "com.tc.bigdata.tool.app.Processor"
  dependencies:
    - "path/to/your/jarfile.jar"
  configurations:
    spark.executor.memory: "2g"
    spark.driver.memory: "1g"
    spark.executor.cores: "2"
  steps:
    - name: "Ingest"
      type: "source"
      format: "csv"
      options:
        path: "/Users/tuan.nguyen3/Documents/Personal-Projects/spark-all-in-one/spark-build-tool/example/input.csv"
        header: "true"
        inferSchema: "true"
        delimiter: ","
        encoding: "UTF-8"
    - name: "Transform"
      type: "transformation"
      operations:
        - operation: "filter"
          condition: "age > 40"
        - operation: "select"
          columns: ["name", "age", "address"]
#        - operation: "withColumn"
#          column: "newColumn"
#          expression: "columnA + columnB"
    - name: "Sink"
      type: "write"
      format: "parquet"
      options:
        path: "/Users/tuan.nguyen3/Documents/Personal-Projects/spark-all-in-one/spark-build-tool/example/output"
        mode: "overwrite"
`
const Backfill: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
    const onChange = (value: string) => {
        console.log(value);
    }
    return (
        <>
         <Button onClick={showDrawer}>
            Yaml
        </Button>
        <Drawer size='large' title="Manifest Spark Job" onClose={onClose} open={open}>
            <FormBackfill yaml={content} onChange={onChange}/>
        </Drawer>
        </>
    )
}

export default Backfill;