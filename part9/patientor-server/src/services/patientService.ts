import patientData from "../../data/patients";

import { Patient, NewPatient, PatientsNoSSN, Entry, NewEntry } from "../types";

const getEntries = (): Patient[] => {
  return patientData;
};

const getEntriesNoSSN = (): PatientsNoSSN[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = {
    id: (patientData.length + 1).toString(),
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

const addNote = (id: string, note: NewEntry): Entry => {
  const relPatient = patientData.find(patient => patient.id === id);
  const relIndex = patientData.findIndex(patient => patient.id === id);

  if (relPatient && (relIndex || relIndex === 0)) {
    const newNote = {
      id: (relPatient.entries.length + 1).toString(),
      ...note
    }
    patientData[relIndex].entries.push(newNote);
    return newNote;
    
  } else {
    throw new Error("Patient not found!")
  }

}

export default {
  getEntries,
  getEntriesNoSSN,
  addEntry,
  addNote
};
