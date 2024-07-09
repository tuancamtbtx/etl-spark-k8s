// sequelize.ts
import { Sequelize } from "sequelize-typescript";
import { SparkJobModel } from "./models/sparkjob.model";
import DBConfig from "./configs/DBConfig";
const sequelize = new Sequelize({
  database: DBConfig.DB,
  dialect: 'mysql',
  username: DBConfig.USER,
  password: DBConfig.PASSWORD,
  host: DBConfig.HOST,
  models: [SparkJobModel], // Add more models as needed
});

export default sequelize;