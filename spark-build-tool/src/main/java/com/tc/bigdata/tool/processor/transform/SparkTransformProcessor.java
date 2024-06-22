package com.tc.bigdata.tool.processor.transform;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;

public class SparkTransformProcessor implements ITransformProcessor {
    @Override
    public Dataset<Row> action(StepSpec spec, Dataset<Row> ds) {
        return null;
    }
}
