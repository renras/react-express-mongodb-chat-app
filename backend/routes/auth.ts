import { Router } from "express";

const router = Router();

router.post("/login", function (req, res, next) {
  res.send("login");
});

export default router;
