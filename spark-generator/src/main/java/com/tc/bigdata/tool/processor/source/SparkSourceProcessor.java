package com.tc.bigdata.tool.processor.source;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.DataFrameReader;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.Map;

public class SparkSourceProcessor implements ISourceProcessor {
    /**
     * Loads a dataset from an external data source using the provided Spark session and step specifications.
     *
     * @param spark The SparkSession instance used to interact with Spark.
     * @param spec  The StepSpec object containing the format and options for loading the data.
     *              - `spec.format` specifies the format of the data source (e.g., "csv", "json").
     *              - `spec.options` is a map of options where keys are option names and values are option values.
     *                The "path" option is mandatory and specifies the location of the data source.
     * @return A Dataset<Row> representing the loaded data.
     */
    @Override
    public Dataset<Row> load(SparkSession spark, StepSpec spec) {
        DataFrameReader sparkFormat = spark.read().format(spec.format);
        Map<String, String> options = spec.options;
        for (Map.Entry<String, String> entry : options.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (!"path".equals(key)) {
                sparkFormat.option(key, value);
            }
        }
        return sparkFormat
                .load(options.get("path"));
    }
}
