package com.tc.bigdata.tool.pipeline;

import com.google.inject.AbstractModule;
import com.google.inject.name.Names;
import com.tc.bigdata.tool.pipeline.batch.SparkBatchPipeline;
import com.tc.bigdata.tool.pipeline.streaming.SparkStreamingPipeline;
import com.tc.bigdata.tool.processor.sink.ISinkProcessor;
import com.tc.bigdata.tool.processor.sink.SparkSinkProcessor;
import com.tc.bigdata.tool.processor.source.ISourceProcessor;
import com.tc.bigdata.tool.processor.source.SparkSourceProcessor;
import com.tc.bigdata.tool.processor.transform.ITransformProcessor;
import com.tc.bigdata.tool.processor.transform.SparkTransformProcessor;

public class PipelineModule extends AbstractModule {
    @Override
    protected void configure() {
        // inject source
        bind(ISourceProcessor.class).to(SparkSourceProcessor.class);

        bind(ITransformProcessor.class).to(SparkTransformProcessor.class);

        bind(ISinkProcessor.class).to(SparkSinkProcessor.class);

        // inject pipeline factory
        bind(ISparkPipeline.class).annotatedWith(Names.named("SparkBatchPipeline")).toInstance(new SparkBatchPipeline());
        bind(ISparkPipeline.class).annotatedWith(Names.named("SparkStreamingPipeline")).toInstance(new SparkStreamingPipeline());
        requestStaticInjection(SparkPipelineFactory.class);
    }
}
