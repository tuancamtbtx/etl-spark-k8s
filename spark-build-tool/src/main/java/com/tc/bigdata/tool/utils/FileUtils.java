package com.tc.bigdata.tool.utils;

import io.github.cdimascio.dotenv.Dotenv;

public class FileUtils {
    public static String SPARK_JOB_CONF_PATH = "SPARK_JOB_CONF_PATH";

    public static String getConfigPipelinePath() {
        Dotenv dotenv = Dotenv.load();
        return dotenv.get(SPARK_JOB_CONF_PATH);
    }
}
