import express from "express";

import patientService from "../services/patientService";
import {toNewNote, toNewPatient} from "../util"; // CHECK THIS

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  const patients = patientService.getEntries();
  const relPatient = patients.find((patient) => patient.id === req.params.id);
  res.json(relPatient);
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

router.post("/:id/entries", (req, res) => {
  try {
    const newNote = toNewNote(req.body);
    const newData = patientService.addNote(req.params.id, newNote);
    res.json(newData);
  } catch (err) {
    res.status(400).send(err.message);
  }
})

export default router;
