import React, { useState } from 'react';

import { Drawer, Button } from 'antd'

import FormBackfill from './editor'

const content = `
apiVersion: "sparkoperator.k8s.io/v1beta2"
kind: SparkApplication
metadata:
  name: spark-pi
  namespace: spark-operator
spec:
  type: Scala
  mode: cluster
  image: "vantuan12345/spark_python:main"
  imagePullPolicy: Always
  mainApplicationFile: "local:///opt/spark/pyspark_job.py"
  sparkVersion: "3.1.1"
  restartPolicy:
    type: Never
  volumes:
    - name: "test-volume"
      hostPath:
        path: "/tmp"
        type: Directory
  driver:
    cores: 1
    coreLimit: "1200m"
    memory: "512m"
    labels:
      version: 3.1.1
    serviceAccount: my-release-spark
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
  executor:
    cores: 1
    instances: 1
    memory: "512m"
    labels:
      version: 3.1.1
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
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