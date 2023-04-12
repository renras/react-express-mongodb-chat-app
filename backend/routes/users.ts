import { Router } from "express";

const router = Router();

router.get("/me", async (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json("User is unauthenticated");
  }
});

export default router;
