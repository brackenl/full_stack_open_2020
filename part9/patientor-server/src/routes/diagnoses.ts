import express from "express";

import diagService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagService.getEntries());
});

export default router;
