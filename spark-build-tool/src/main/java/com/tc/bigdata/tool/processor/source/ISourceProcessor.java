package com.tc.bigdata.tool.processor.source;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public interface ISourceProcessor {
    Dataset<Row> load(SparkSession spark, StepSpec spec);
}
