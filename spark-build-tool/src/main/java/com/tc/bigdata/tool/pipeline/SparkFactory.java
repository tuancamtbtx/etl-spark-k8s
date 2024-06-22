package com.tc.bigdata.tool.pipeline;

import com.tc.bigdata.tool.pipeline.batch.SparkBatchPipeline;

public class SparkFactory {
    public static String BATCH_JOB = "SparkBatchPipeline";

    public static ISparkPipeline getSparkPipeline(String kindJob) {
        if (BATCH_JOB.equals(kindJob)) {
            return new SparkBatchPipeline();
        } else {
            throw new RuntimeException("Unsupport this job kind");
        }
    }
}
