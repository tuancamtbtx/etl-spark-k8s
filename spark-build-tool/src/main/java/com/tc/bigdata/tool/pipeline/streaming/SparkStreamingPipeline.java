package com.tc.bigdata.tool.pipeline.streaming;

import com.tc.bigdata.tool.pipeline.ISparkPipeline;
import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.expressions.UserDefinedFunction;

public class SparkStreamingPipeline implements ISparkPipeline {

    public SparkStreamingPipeline() {

    }

    @Override
    public SparkSession getSparkSession(SparkPipelineSpec spec) {
        return null;
    }

    @Override
    public boolean validation(SparkPipelineSpec spec) {
        return false;
    }

    @Override
    public void run(SparkPipelineSpec spec) {

    }

    @Override
    public void loadUDF(UserDefinedFunction udfFunc, String nameFunc) {

    }
}
