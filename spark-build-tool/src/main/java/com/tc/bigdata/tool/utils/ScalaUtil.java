package com.tc.bigdata.tool.utils;

import org.apache.spark.sql.Column;
import scala.collection.JavaConverters;
import scala.collection.immutable.Seq;

import java.util.List;

public class ScalaUtil {
    public static Seq<Column> convertListColumnToSeqColumn(List<Column> inputList) {
        return JavaConverters.asScalaIteratorConverter(inputList.iterator()).asScala().toSeq();
    }}
