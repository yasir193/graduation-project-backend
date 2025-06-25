import express from "express";
import { config } from "dotenv";
config();
import { database_connection } from "../DB/connection.js";
import authController from "../Modules/Auth/auth.controller.js";
import userController from "../Modules/User/user.controller.js";
import speedController from "../Modules/Speed/speed.controller.js";
import statusController from "../Modules/Status/status.controller.js";
import { Status } from "../DB/models/status.model.js";
import cors from 'cors'; // Import the cors package
import gpsController from "../Modules/GPS/GPS.controller.js";

export const main = () => {
  const app = express();

  

  app.use(cors({
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
  }));


  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

  (async () => {
    try {
      await database_connection();
      console.log("✅ Database connected successfully.");
    } catch (err) {
      console.error("❌ Database connection error:", err);
    }
  })();

  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/", speedController);
  app.use("/", statusController);
  app.use("/", gpsController);

  app.get("/", async (req, res) => {
    res.json({ message: "Server is running!", data: await Status.findOne() });
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};