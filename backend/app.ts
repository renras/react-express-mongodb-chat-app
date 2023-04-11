import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/", authRouter);

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
