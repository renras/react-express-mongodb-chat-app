import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/api/v1", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/auth", authRouter);

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
