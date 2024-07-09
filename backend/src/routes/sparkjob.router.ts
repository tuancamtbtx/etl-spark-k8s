import { Router } from "express";
import SparkJobController from "@src/controllers/sparkjob.controller";
class CustomerRouter {
  router = Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post("/", (req, res) => {
      const controller = new SparkJobController();
      controller.createCustomer(req, res);
    });
    this.router.put("/:id", async (req, res) => {
      const controller = new SparkJobController();
      controller.updateCustomer(req, res);
    });
    this.router.delete("/:id", (req, res) => {
      const controller = new SparkJobController();
      controller.deleteCustomer(req, res);
    });
    this.router.post("/:id/deposit", (req, res) => {
      const controller = new SparkJobController();
    });
  }
}

export default new CustomerRouter().router;