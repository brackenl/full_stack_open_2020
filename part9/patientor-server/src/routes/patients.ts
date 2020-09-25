import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntriesNoSSN());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  res.json(
    patientService.addEntry({ name, dateOfBirth, gender, occupation, ssn })
  );
});

export default router;
