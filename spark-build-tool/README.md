# Spark Build Tool
## Getting Started

### Using Maven

1. **Clone the repository:**
    ```bash
    git clone https://github.com/tuancamtbtx/spark-all-in-one.git
    cd spark-all-in-one/spark-build-tool
    ```

2. **Build the project:**
    ```bash
    mvn clean install
    ```
The Kubernetes Spark Operator is a Kubernetes custom controller that makes it easy to run Apache Spark applications on Kubernetes. Here’s how you can install the Kubernetes Spark Operator on your local Minikube cluster:
## Install K8S Spark Operator:
### Prerequisites

1. **Minikube**: Make sure you have a running Minikube cluster.
2. **kubectl**: Ensure `kubectl` is installed and configured to communicate with your Minikube cluster.

### Step-by-Step Guide

#### 1. Start Minikube (if not already running)

```sh
minikube start
```

#### 2. Clone the Spark Operator Repository

First, clone the Spark Operator GitHub repository:

```sh
git clone https://github.com/GoogleCloudPlatform/spark-on-k8s-operator
cd spark-on-k8s-operator
```

#### 3. Create Namespace

Create a namespace for the Spark Operator:

```sh
kubectl create namespace spark-operator
```

#### 4. Install the Spark Operator

Use Helm to install the Spark Operator. If you don't have Helm installed, you can install it by following the instructions on the [Helm website](https://helm.sh/docs/intro/install/).

Add the Helm repository for the Spark Operator:

```sh
helm repo add spark-operator https://kubeflow.github.io/spark-operator
helm repo update
```

Install the Spark Operator using Helm:

```sh
helm install spark-operator spark-operator/spark-operator --namespace spark-operator --create-namespace
```

This will deploy the Spark Operator in the `spark-operator` namespace.

#### 5. Verify Installation

Check if the Spark Operator is running:

```sh
kubectl get pods -n spark-operator
```

## Configuration
Configuration for the Spark pipeline is loaded from a YAML file. Ensure you have a `spark-pipeline-config.yaml` file in the resources directory with the appropriate settings.
**Spark Job Pipeline Config**
Example `spark-pipeline-config.yaml`:
```yaml
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
        path: "/path/data/input.csv"
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
        - operation: "withColumn"
          column: "newColumn"
          expression: "columnA + columnB"
    - name: "Sink"
      type: "write"
      format: "parquet"
      options:
        path: "/output"
        mode: "overwrite"
```
**K8S Spark Job Config**
Example `k8s_spark_job.yaml`:
```yaml
apiVersion: "sparkoperator.k8s.io/v1beta2"
kind: SparkApplication
metadata:
  name: spark-etl
  namespace: default
spec:
  type: Java
  mode: cluster
  image: "ghcr.io/tuancamtbtx/spark-build-tool:main"
  env:
    - name: SPARK_JOB_CONF_PATH
      value: "your_spark_pipeline_job_path_conf"
  imagePullPolicy: Always
  mainClass: com.tc.bigdata.tool.app.Processor
  mainApplicationFile: "local:///opt/spark/spark-build-tool.jar"
  sparkVersion: "3.5.1"
  sparkUIOptions:
    serviceLabels:
      test-label/v1: 'true'
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
      version: 3.5.1
    serviceAccount: spark-operator-spark
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
  executor:
    cores: 1
    instances: 1
    memory: "512m"
    labels:
      version: 3.5.0
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
```