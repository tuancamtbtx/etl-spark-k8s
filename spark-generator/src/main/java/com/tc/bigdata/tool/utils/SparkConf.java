package com.tc.bigdata.tool.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.tc.bigdata.tool.spec.SparkPipelineSpec;

import java.io.File;
import java.io.IOException;

public class SparkConf {
    public static SparkPipelineSpec readConfig(String path) {
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        try {
            return mapper.readValue(new File(path), SparkPipelineSpec.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read configuration file", e);
        }
    }
}
