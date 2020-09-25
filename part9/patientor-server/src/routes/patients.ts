import express from "express";

import patientService from "../services/patientService";
import toNewPatient from "../util";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntriesNoSSN());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const newData = patientService.addEntry(newPatient);
    res.json(newData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
