import { Router } from "express";

const router = Router();

router.get("/me", async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
