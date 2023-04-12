import { Router } from "express";
import passport from "passport";
import User from "../models/User";

const router = Router();

router.post("/register", function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email or password is undefined");
  }

  User.register(new User({ email }), password, function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json("Successfully registered user");
  });
});

export default router;

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  function (req, res) {
    return res.status(200).json("Successfully logged in user");
  }
);

router.post("/logout", async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json("Successfully logged out user");
  });
});
