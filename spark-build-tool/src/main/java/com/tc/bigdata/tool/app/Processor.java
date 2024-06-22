package com.tc.bigdata.tool.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Processor extends AbstractSparkApp {
    private static final Logger log = LoggerFactory.getLogger(Processor.class);

    public static void main(String[] args) {
        log.info("Spark Build Tool!");
        process();
    }

    public static void process() {
        Processor processor = new Processor();
        processor.run();
    }
}
