package com.tc.bigdata.tool.pipeline;

import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.expressions.UserDefinedFunction;

public interface ISparkPipeline {
    SparkSession getSparkSession(SparkPipelineSpec spec);

    boolean validation(SparkPipelineSpec spec);

    void run(SparkPipelineSpec spec);

    void loadUDF(UserDefinedFunction udfFunc, String nameFunc);
}
