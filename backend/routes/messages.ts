import Message from "../models/message";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { from, body } = req.body;

  if (!from || !body) {
    return res.status(400).json("A field is missing");
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

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json("Failed to get messages");
  }
});
