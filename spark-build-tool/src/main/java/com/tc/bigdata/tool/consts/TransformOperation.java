package com.tc.bigdata.tool.consts;

public enum TransformOperation {
    FILTER("Batch Job"),
    SELECT("Streaming Job");

    private final String description;

    /**
     * Constructor to initialize the enum constant with a description.
     *
     * @param description A string description of the job type.
     */
    TransformOperation(String description) {
        this.description = description;
    }

    /**
     * Gets the description of the job type.
     *
     * @return A string description of the job type.
     */
    public String getDescription() {
        return description;
    }
}
