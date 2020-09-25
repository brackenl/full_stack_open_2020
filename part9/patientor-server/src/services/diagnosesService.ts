import diagData from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
