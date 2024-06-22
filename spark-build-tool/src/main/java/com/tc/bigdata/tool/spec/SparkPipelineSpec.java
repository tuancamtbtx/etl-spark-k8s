package com.tc.bigdata.tool.spec;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SparkPipelineSpec {
    @JsonProperty("apiVersion")
    public String apiVersion;
    @JsonProperty("kind")
    public String kind;

    @JsonProperty("spec")
    public SparkJobSpec spec;

    public boolean isValid() {
        return true;
    }

    @Override
    public String toString() {
        return "SparkJob{" +
                "apiVersion='" + apiVersion + '\'' +
                ", kind='" + kind + '\'' +
                ", spec=" + spec +
                '}';
    }
}
