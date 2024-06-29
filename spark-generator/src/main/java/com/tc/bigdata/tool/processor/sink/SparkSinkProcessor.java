package com.tc.bigdata.tool.processor.sink;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.DataFrameWriter;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class SparkSinkProcessor implements ISinkProcessor {
    private static final Logger log = LoggerFactory.getLogger(SparkSinkProcessor.class);

    /**
     * Saves a dataset to an external data sink using the provided step specifications.
     *
     * @param spec The StepSpec object containing the format and options for saving the data.
     *             - `spec.format` specifies the format of the data sink (e.g., "csv", "json").
     *             - `spec.options` is a map of options where keys are option names and values are option values.
     *             The "path" option is mandatory and specifies the destination location for the data.
     * @param ds   The Dataset<Row> that needs to be saved.
     */
    @Override
    public void sink(StepSpec spec, Dataset<Row> ds) {
        log.info("sink dataset to {} - options: {}", spec.format, spec.options);
        DataFrameWriter<Row> writer = ds.write().format(spec.format);
        Map<String, String> options = spec.options;
        for (Map.Entry<String, String> entry : options.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (!"path".equals(key)) {
                writer.option(key, value);
            }
        }
        writer.save(options.get("path"));
    }
}
