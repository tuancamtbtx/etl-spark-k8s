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
## Configuration
Configuration for the Spark pipeline is loaded from a YAML file. Ensure you have a `spark-pipeline-config.yaml` file in the resources directory with the appropriate settings.

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
