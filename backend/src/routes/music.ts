import { Router } from "express";
import { getMusic, updateMusic, validateMusicData } from "../utils/musicUtils";
import uuid4 from "uuid4";

export const musicRouter = Router();

musicRouter.get("/", (req, res) => {
  const music = getMusic();

  res.json(music);
});

musicRouter.post("/", (req, res) => {
  const data = req.body;

  if (!validateMusicData(data)) {
    res.status(400);
    return;
  }

  console.log("test2");

  const newMusic = { ...data, id: uuid4() };

  updateMusic(newMusic);

  res.status(201).json(newMusic);
});
