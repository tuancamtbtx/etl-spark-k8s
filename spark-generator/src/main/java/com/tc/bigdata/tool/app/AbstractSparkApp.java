package com.tc.bigdata.tool.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.google.inject.Guice;
import com.tc.bigdata.tool.pipeline.ISparkPipeline;
import com.tc.bigdata.tool.pipeline.PipelineModule;
import com.tc.bigdata.tool.pipeline.SparkPipelineFactory;
import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import com.tc.bigdata.tool.utils.FileUtils;

import java.io.File;
import java.io.IOException;

public abstract class AbstractSparkApp {
    /**
     * Loads the Spark pipeline configuration from a YAML file and returns a SparkPipelineSpec object.
     * If the configuration file cannot be read, the method will throw a RuntimeException.
     *
     * @return A SparkPipelineSpec object containing the configuration details.
     * @throws RuntimeException if the configuration file cannot be read or if the config path is empty.
     */
    public SparkPipelineSpec loadConfigOrDie() {
        String path = FileUtils.getConfigPipelinePath();
        assert path != null : "config path is empty, please set it";
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        try {
            return mapper.readValue(new File(path), SparkPipelineSpec.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read configuration file", e);
        }
    }

    /**
     * Executes the Spark pipeline based on the configuration loaded from a YAML file.
     * <p>
     * This method performs the following steps:
     * 1. Loads the Spark pipeline configuration using the `loadConfigOrDie` method.
     * 2. Initializes the dependency injection framework using Guice.
     * 3. Determines the type of job (batch or streaming) from the configuration.
     * 4. Retrieves the appropriate Spark pipeline using the SparkPipelineFactory.
     * 5. Runs the retrieved Spark pipeline using the loaded configuration.
     */
    void run() {
        SparkPipelineSpec sparkPipelineSpec = this.loadConfigOrDie();
        Guice.createInjector(new PipelineModule());
        String kindJob = sparkPipelineSpec.kind;
        ISparkPipeline sparkPipeline = SparkPipelineFactory.getPipeline(kindJob);
        sparkPipeline.run(sparkPipelineSpec);
    }
}
