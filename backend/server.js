import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import templeRoutes from "./routes/templeRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";

import circuitRoutes from "./routes/circuitRoutes.js";

import deityRoutes from "./routes/deityRoutes.js";

import festivalRoutes from "./routes/festivalRoutes.js";

import cityRoutes from "./routes/cityRoutes.js";

import stateRoutes from "./routes/stateRoutes.js";

import ritualRoutes from "./routes/ritualRoutes.js";

import userRoutes from "./routes/userRouter.js"

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Temple Heritage API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/temples", templeRoutes);

app.use("/api/circuits", circuitRoutes);

app.use("/api/deities", deityRoutes);

app.use("/api/festivals", festivalRoutes);

app.use("/api/cities", cityRoutes);

app.use("/api/states", stateRoutes);

app.use("/api/rituals", ritualRoutes);

app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
