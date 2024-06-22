package com.tc.bigdata.tool.processor.source;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.DataFrameReader;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.Map;

public class SparkSourceProcessor implements ISourceProcessor {
    /**
     * @param spark
     * @param spec
     * @return
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
