package com.tc.bigdata.tool.spec;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class StepSpec {
    @JsonProperty("name")
    public String name;

    @JsonProperty("type")
    public String type;

    @JsonProperty("format")
    public String format;

    @JsonProperty("options")
    public Map<String, String> options;

    @JsonProperty("operations")
    public List<OperationSpec> operations;

    public boolean isValid() {
        return true;
    }

    @Override
    public String toString() {
        return "DataSourceConfig{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", format='" + format + '\'' +
                ", options=" + options +
                ", operations=" + operations +
                '}';
    }

}
