import { Router } from "express";

const router = Router();

router.get("/login", function (req, res, next) {
  res.send("login");
});

export default router;
