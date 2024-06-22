package com.tc.bigdata.tool.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.tc.bigdata.tool.pipeline.ISparkPipeline;
import com.tc.bigdata.tool.pipeline.SparkFactory;
import com.tc.bigdata.tool.spec.SparkPipelineSpec;
import com.tc.bigdata.tool.utils.FileUtils;

import java.io.File;
import java.io.IOException;

public abstract class AbstractSparkApp {
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

    void run() {
        SparkPipelineSpec sparkPipelineSpec = this.loadConfigOrDie();
        ISparkPipeline sparkPipeline = SparkFactory.getSparkPipeline(sparkPipelineSpec.kind);
        assert sparkPipeline.validation(sparkPipelineSpec) : "";
        sparkPipeline.run(sparkPipelineSpec);
    }
}
