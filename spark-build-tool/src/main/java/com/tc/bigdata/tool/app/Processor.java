package com.tc.bigdata.tool.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Processor extends AbstractSparkApp {
    private static final Logger log = LoggerFactory.getLogger(Processor.class);

    public static void main(String[] args) {
        log.info("Spark Build Tool!");
        process();
    }

    /**
     * Static method to initiate and run the processing logic using the Processor class.
     * <p>
     * This method performs the following steps:
     * 1. Creates an instance of the Processor class.
     * 2. Calls the `run` method on the Processor instance to execute the processing logic.
     */
    public static void process() {
        Processor processor = new Processor();
        processor.run();
    }
}
