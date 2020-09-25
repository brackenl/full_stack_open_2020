import { NewPatient, Gender } from "./types";

const toNewPatient = (obj: any): NewPatient => {
  // name, dateOfBirth, gender, occupation, ssn
  const { name, dateOfBirth, gender, occupation, ssn } = obj;

  const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing comment: " + name);
    }
    return name;
  };

  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
      console.log(date);
      throw new Error("Incorrect or missing date: " + date);
    }
    return date;
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
  };

  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error("Inccorrect or missing occupation: " + occupation);
    }
    return occupation;
  };

  const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error("Inccorrect or missing SSN: " + ssn);
    }
    return ssn;
  };

  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSSN(ssn),
  };
  return newPatient;
};

export default toNewPatient;
