package com.tc.bigdata.tool.utils;

import org.apache.spark.sql.Column;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;

import java.util.List;
import java.util.stream.Collectors;

public class SparkOperationUtil {
    public static Dataset<Row> filter(Dataset<Row> inputDs, String conditionExpr) {
        return inputDs.filter(conditionExpr);
    }

    public static Dataset<Row> select(Dataset<Row> inputDs, List<String> columns) {
        List<Column> cols = columns.stream().map(Column::new).collect(Collectors.toList());
        return inputDs.select(ScalaUtil.convertListColumnToSeqColumn(cols));
    }

    public static Dataset<Row> withColumn(Dataset<Row> inputDs, String oldCol, String newCol, String conditionExpr) {
        Column newColumn = new Column(newCol);
        return inputDs.withColumn(oldCol, newColumn);
    }
}
