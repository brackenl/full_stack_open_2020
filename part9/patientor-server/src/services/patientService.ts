import patientData from "../../data/patients";

import { Patient, NewPatient, PatientsNoSSN } from "../types";

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

export default {
  getEntries,
  getEntriesNoSSN,
  addEntry,
};
