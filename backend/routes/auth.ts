import { Router } from "express";
import passport from "passport";
import User from "../models/User";

const router = Router();

router.post("/register", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email or password is undefined");
    }

    const user = await User.register(new User({ email }), password);

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
