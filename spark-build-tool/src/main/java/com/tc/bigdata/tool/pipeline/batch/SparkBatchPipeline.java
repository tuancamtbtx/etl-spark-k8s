package com.tc.bigdata.tool.pipeline.batch;

import com.tc.bigdata.tool.pipeline.ISparkPipeline;
import com.tc.bigdata.tool.spec.SparkJobSpec;
import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.expressions.UserDefinedFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SparkBatchPipeline implements ISparkPipeline {
    private static final Logger log = LoggerFactory.getLogger(SparkBatchPipeline.class);

    @Override
    public SparkSession getSparkSession(SparkPipelineSpec sparkPipelineSpec) {
        SparkSession.Builder builder = SparkSession.builder();
        SparkJobSpec sparkJobSpec = sparkPipelineSpec.spec;
        SparkSession spark = builder
                .appName(sparkJobSpec.appName)
                .master(sparkJobSpec.master)
                .config(sparkJobSpec.configurations)
                .getOrCreate();
        spark.sparkContext().setCheckpointDir("path");
        return spark;
    }

    @Override
    public boolean validation(SparkPipelineSpec spec) {
        return false;
    }


    @Override
    public void loadUDF(UserDefinedFunction udfFunc, String nameFunc) {
    }


    @Override
    public void run(SparkPipelineSpec spec) {
        log.info("spark job run with configuration: {}", spec);
        SparkSession spark = this.getSparkSession(spec);
        spark.stop();
    }
}
