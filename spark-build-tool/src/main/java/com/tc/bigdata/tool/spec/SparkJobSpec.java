package com.tc.bigdata.tool.spec;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class SparkJobSpec implements Serializable {
    @JsonProperty("jobName")
    public String jobName;

    @JsonProperty("master")
    public String master;

    @JsonProperty("appName")
    public String appName;

    @JsonProperty("javaClass")
    public String javaClass;

    @JsonProperty("dependencies")
    public List<String> dependencies;

    @JsonProperty("configurations")
    public Map<String, Object> configurations;

    @JsonProperty("steps")
    public List<StepSpec> steps;
}
