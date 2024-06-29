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
    /**
     * Configures the dependency injection bindings using Guice.
     * <p>
     * This method performs the following configurations:
     * 1. Binds the ISourceProcessor interface to the SparkSourceProcessor implementation.
     * 2. Binds the ITransformProcessor interface to the SparkTransformProcessor implementation.
     * 3. Binds the ISinkProcessor interface to the SparkSinkProcessor implementation.
     * 4. Binds named instances of ISparkPipeline:
     * - Binds "SparkBatchPipeline" to a new instance of SparkBatchPipeline.
     * - Binds "SparkStreamingPipeline" to a new instance of SparkStreamingPipeline.
     * 5. Requests static injection for the SparkPipelineFactory class to allow it to access injected dependencies.
     */
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
