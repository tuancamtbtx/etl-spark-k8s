package com.tc.bigdata.tool.pipeline;

import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.expressions.UserDefinedFunction;

/**
 * Interface for defining a Spark pipeline.
 * <p>
 * This interface provides the following methods:
 * <p>
 * - `getSparkSession(SparkPipelineSpec spec)`: Creates and returns a SparkSession based on the provided Spark pipeline specification.
 * <p>
 * - `validation(SparkPipelineSpec spec)`: Validates the provided Spark pipeline specification.
 * <p>
 * - `run(SparkPipelineSpec spec)`: Executes the Spark job based on the provided Spark pipeline specification.
 * <p>
 * - `loadUDF(UserDefinedFunction udfFunc, String nameFunc)`: Loads a user-defined function (UDF) into the Spark session.
 */
public interface ISparkPipeline {
    SparkSession getSparkSession(SparkPipelineSpec spec);

    boolean validation(SparkPipelineSpec spec);

    void run(SparkPipelineSpec spec);

    void loadUDF(UserDefinedFunction udfFunc, String nameFunc);
}
