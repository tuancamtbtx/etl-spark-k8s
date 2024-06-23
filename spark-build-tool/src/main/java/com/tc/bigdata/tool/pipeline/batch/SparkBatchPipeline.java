package com.tc.bigdata.tool.pipeline.batch;

import com.google.inject.Inject;
import com.tc.bigdata.tool.pipeline.ISparkPipeline;
import com.tc.bigdata.tool.processor.sink.ISinkProcessor;
import com.tc.bigdata.tool.processor.source.ISourceProcessor;
import com.tc.bigdata.tool.processor.transform.ITransformProcessor;
import com.tc.bigdata.tool.spec.SparkJobSpec;
import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.expressions.UserDefinedFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.stream.Collectors;

public class SparkBatchPipeline implements ISparkPipeline {
    private static final String SOURCE_SPEC = "source";
    private static final String TRANSFORM_SPEC = "transformation";
    private static final String SINK_SPEC = "write";

    private static final Logger log = LoggerFactory.getLogger(SparkBatchPipeline.class);
    @Inject
    private ISinkProcessor sinkProcessor;
    @Inject
    private ISourceProcessor sourceProcessor;
    @Inject
    private ITransformProcessor transformProcessor;

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
        return true;
    }

    @Override
    public void loadUDF(UserDefinedFunction udfFunc, String nameFunc) {
    }

    public StepSpec getSourceSpec(SparkJobSpec spec) {
        return spec.steps.stream().filter(e -> SOURCE_SPEC.equals(e.type)).collect(Collectors.toList()).get(0);
    }
    public StepSpec getSinkSpec(SparkJobSpec spec) {
        return spec.steps.stream().filter(e -> SINK_SPEC.equals(e.type)).collect(Collectors.toList()).get(0);
    }
    public StepSpec getTransformSpec(SparkJobSpec spec) {
        return spec.steps.stream().filter(e -> TRANSFORM_SPEC.equals(e.type)).collect(Collectors.toList()).get(0);
    }

    @Override
    public void run(SparkPipelineSpec spec) {
        log.info("spark job run with configuration: {}", spec);
        SparkSession spark = this.getSparkSession(spec);
        SparkJobSpec sparkJobSpec = spec.spec;
        StepSpec sourceSpec = this.getSourceSpec(sparkJobSpec);
        log.info("Source Spec: {}", sourceSpec);
        StepSpec transformSpec = this.getTransformSpec(sparkJobSpec);
        log.info("Transform Spec: {}", transformSpec);
        StepSpec sinkSpec = this.getSinkSpec(sparkJobSpec);
        log.info("Sink Spec: {}", sinkSpec);
        Dataset<Row> sourceDs = sourceProcessor.load(spark, sourceSpec);
        sourceDs.show();
        Dataset<Row> transformedDs = transformProcessor.action(transformSpec, sourceDs);
        transformedDs.show();
        sinkProcessor.sink(sinkSpec, transformedDs);
        spark.stop();
    }
}
