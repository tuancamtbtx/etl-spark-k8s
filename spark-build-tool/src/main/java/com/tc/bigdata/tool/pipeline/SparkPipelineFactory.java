package com.tc.bigdata.tool.pipeline;

import com.google.inject.Inject;
import com.google.inject.name.Named;

public class SparkPipelineFactory {
    public static final String BATCH_JOB = "SparkBatchPipeline";
    public static final String STREAMING_JOB = "SparkStreamingPipeline";
    @Inject
    @Named("SparkBatchPipeline")
    private static ISparkPipeline batchPipeline;
    @Inject
    @Named("SparkStreamingPipeline")
    private static ISparkPipeline streamingPipeline;

    private SparkPipelineFactory() {
        throw new UnsupportedOperationException();
    }

    public static ISparkPipeline getBank(String jobType) {
        switch (jobType) {
            case SparkPipelineFactory.BATCH_JOB:
                return batchPipeline;
            case SparkPipelineFactory.STREAMING_JOB:
                return streamingPipeline;
            default:
                throw new IllegalArgumentException("This pipeline type is unsupported");
        }
    }
}
