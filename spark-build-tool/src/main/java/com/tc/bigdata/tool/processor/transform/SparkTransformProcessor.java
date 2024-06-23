package com.tc.bigdata.tool.processor.transform;

import com.tc.bigdata.tool.spec.OperationSpec;
import com.tc.bigdata.tool.spec.StepSpec;
import com.tc.bigdata.tool.utils.SparkOperationUtil;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SparkTransformProcessor implements ITransformProcessor {
    private static final Logger log = LoggerFactory.getLogger(SparkTransformProcessor.class);

    @Override
    public Dataset<Row> action(StepSpec spec, Dataset<Row> ds) {
        for (OperationSpec operation : spec.operations) {
            log.info("operation: {}", operation);
            switch (operation.operation) {
                case "filter":
                    ds = SparkOperationUtil.filter(ds, operation.condition);
                    break;
                case "select":
                    ds = SparkOperationUtil.select(ds, operation.columns);
                    break;
                default:
                    log.info("{} operation is unsupport", operation.operation);
            }
        }
        return ds;
    }

}
