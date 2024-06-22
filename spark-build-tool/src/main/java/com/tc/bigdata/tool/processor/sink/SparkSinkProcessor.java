package com.tc.bigdata.tool.processor.sink;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SparkSinkProcessor implements ISinkProcessor {
    private static final Logger log = LoggerFactory.getLogger(SparkSinkProcessor.class);

    @Override
    public void sink(StepSpec spec, Dataset<Row> ds) {
        log.info("sink dataset to {} - options: {}", spec.format, spec.options);
    }
}
