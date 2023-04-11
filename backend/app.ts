import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import passport from "passport";
import User from "./models/User";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/api/v1", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use(express.json());
app.use("/api/v1/auth", authRouter);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
