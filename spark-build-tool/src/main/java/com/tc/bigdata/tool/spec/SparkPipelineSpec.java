package com.tc.bigdata.tool.spec;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SparkPipelineSpec {
    @JsonProperty("apiVersion")
    public String apiVersion;
    @JsonProperty("kind")
    public String kind;

    @JsonProperty("spec")
    public SparkJobSpec spec;
}
