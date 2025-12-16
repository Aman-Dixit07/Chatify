import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { ENV } from "./lib/env.js";

const __dirname = path.resolve();

const app = express();
const Port = ENV.PORT || 5000;

//middlewares
app.use(express.json()); //to read the req.body otherwise it will return undefined
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//Deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(Port, () => {
  console.log(`Server running on port- ${Port}`);
  connectDB();
});
