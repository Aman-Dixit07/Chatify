import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const __dirname = path.resolve();
dotenv.config();

const app = express();
const Port = process.env.Port || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(Port, () => console.log(`Server running on port- ${Port}`));
