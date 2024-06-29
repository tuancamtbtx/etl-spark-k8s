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

    /**
     * Returns an appropriate Spark pipeline based on the provided job type.
     *
     * @param jobType The type of job for which the pipeline is needed. Expected values are:
     *                - `SparkPipelineFactory.BATCH_JOB`: For batch processing jobs.
     *                - `SparkPipelineFactory.STREAMING_JOB`: For streaming jobs.
     * @return An instance of ISparkPipeline corresponding to the specified job type.
     * @throws IllegalArgumentException if the provided job type is unsupported.
     */
    public static ISparkPipeline getPipeline(String jobType) {
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
