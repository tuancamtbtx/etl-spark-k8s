import express, { Application } from "express";
import sequelize from "@src/sequelize";

import SparkJobRouter from "@src/routes/sparkjob.router";
import logger from "@src/utils/logger";
import { errorHandler } from "@src/middlewares/ErrorMiddleware";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function initialize() {
  try {
    await sequelize.sync({ force: true }); // Sync the models with the database
  } catch (error) {
    console.error("Error initializing Sequelize:", error);
  }
}
initialize().then(() => {
  console.log("Initialized Sequelize");
});
app.use("/api/customers", SparkJobRouter);
app.use(errorHandler);
const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
