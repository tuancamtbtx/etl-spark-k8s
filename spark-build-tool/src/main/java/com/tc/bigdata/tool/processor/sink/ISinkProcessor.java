package com.tc.bigdata.tool.processor.sink;

import com.tc.bigdata.tool.spec.StepSpec;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;

public interface ISinkProcessor {
   void sink(StepSpec spec, Dataset<Row> ds);
}
