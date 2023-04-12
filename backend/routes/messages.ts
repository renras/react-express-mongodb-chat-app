import Message from "../models/message";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { from, body } = req.body;

  if (!from || !body) {
    return res.status(400).json("a field is missing");
  }

  try {
    const message = await Message.create({ from, body });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default router;
