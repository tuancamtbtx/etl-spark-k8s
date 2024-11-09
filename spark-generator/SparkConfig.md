# Spark Batch Pipeline Configuration Guide

Welcome to the Spark Batch Pipeline Configuration Guide. This document will help you understand how to configure and run a Spark job using the provided YAML configuration file.

## Overview

This configuration file is designed to run a Spark job that ingests data from a CSV file, performs transformations, and writes the output to a Parquet file. The job is defined with specific parameters and steps to ensure smooth data processing.

## Configuration File Breakdown

### Basic Information

- **apiVersion**: Specifies the API version. For this configuration, it is set to "v1".
- **kind**: Indicates the type of job. Here, it is a `SparkBatchPipeline`.

### Specification (`spec`)

- **jobName**: The name of the Spark job. Example: `"ExampleSparkJob"`.
- **master**: Defines the Spark master URL. For local execution, use `"local[*]"`.
- **appName**: The application name displayed in the Spark UI. Example: `"Spark Ingest Transform Sink Job"`.
- **javaClass**: The main Java class to be executed. Example: `"com.tc.bigdata.tool.app.Processor"`.

### Dependencies

- **dependencies**: List of paths to JAR files required for the job. Example: `"path/to/your/jarfile.jar"`.

### Configurations

- **spark.executor.memory**: Memory allocated for each executor. Example: `"2g"`.
- **spark.driver.memory**: Memory allocated for the driver. Example: `"1g"`.
- **spark.executor.cores**: Number of cores allocated for each executor. Example: `"2"`.

### Steps

#### 1. Ingest

- **name**: Step name. Example: `"Ingest"`.
- **type**: Type of operation. Here, it's `"source"`.
- **format**: Data format. Example: `"csv"`.
- **options**: Configuration options for the data source.
    - **path**: File path. Example: `"/path/to/input.csv"`.
    - **header**: Whether the CSV has a header. `"true"` or `"false"`.
    - **inferSchema**: Automatically infer data types. `"true"` or `"false"`.
    - **delimiter**: Field delimiter. Example: `","`.
    - **encoding**: File encoding. Example: `"UTF-8"`.

#### 2. Transform

- **name**: Step name. Example: `"Transform"`.
- **type**: Type of operation. Here, it's `"transformation"`.
- **operations**: List of transformations.
    - **filter**: Condition to filter data. Example: `"age > 40"`.
    - **select**: Columns to select. Example: `["name", "age", "address"]`.

#### 3. Sink

- **name**: Step name. Example: `"Sink"`.
- **type**: Type of operation. Here, it's `"write"`.
- **format**: Output data format. Example: `"parquet"`.
- **options**: Configuration options for the data sink.
    - **path**: Output file path. Example: `"/path/to/output"`.
    - **mode**: Write mode. Example: `"overwrite"`.

## Running the Job

1. **Prepare Your Environment**: Ensure you have Apache Spark installed on your machine.
2. **Update the Configuration**: Modify the paths and parameters in the configuration file as needed.
3. **Execute the Job**: Use the Spark-submit command to run your job:

   ```bash
   spark-submit --class com.tc.bigdata.tool.app.Processor --master local[*] path/to/your/jarfile.jar
   ```

4. **Monitor the Job**: Access the Spark UI to monitor job progress and performance.

## Conclusion

This guide provides a comprehensive overview of configuring and running a Spark batch pipeline. Customize the configuration to suit your data processing needs and ensure all paths and parameters are correctly set before execution. Happy Sparking!
