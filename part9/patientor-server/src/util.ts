import { NewPatient, Gender, NewEntry, HealthCheckRating, SickLeave, Discharge } from "./types";

// SHARED

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// NEW PATIENT CHECK

export const toNewPatient = (obj: any): NewPatient => {
  // name, dateOfBirth, gender, occupation, ssn
  const { name, dateOfBirth, gender, occupation, ssn } = obj;

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing name: " + name);
    }
    return name;
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
    entries: [],
  };
  return newPatient;
};

// NEW ENTRY CHECK

export const toNewNote = (obj: any): NewEntry => {


  const {description, date, specialist, diagnosisCodes, type} = obj;

  const parseDescription = (description: any) => {
    if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description: ' + description)
    }

    return description;
  }

  const parseSpecialist = (specialist: any) => {
    if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist: ' + specialist)
    }
    return specialist;
  }

  const parseDiagCodes = (diagnosisCodes: any) => {
    if (!diagnosisCodes) {
      return null
    }
    
      return diagnosisCodes;
  }

  const parseType = (type: any) => {
    if (!type) {
      throw new Error('Incorrect or missing type: ' + type)
    }

    if (type !== "HealthCheck" && type !== "OccupationalHealthcare" && type !== "Hospital") {
      throw new Error('Invalid type selected')
    }
    return type;
  }

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating && rating !== 0) {
      throw new Error("Missing health check rating: " + rating);
    }
    if (!isHealthCheckRating(rating)) {
      throw new Error("Incorrect health check rating: " + rating);
    }
    return rating;
  }

  const parseEmployerName = (name: any) => {
    if (!name || !isString(name)) {
      throw new Error("Missing or incorrect employer name: " + name)
    }
    return name;
  }

  const isSickLeave = (leave: any): leave is SickLeave => {
    if ((leave as SickLeave).startDate) {
      return true
    }
    return false
  }

  const parseSickLeave = (leave: any) => {
    if (!leave) {
      return undefined
    }
    if (!isSickLeave(leave)) {
      throw new Error("Invalid sick leave")
    }
    return leave
  }

  const isDischarge = (discharge: any): discharge is Discharge => {
    if ((discharge as Discharge).date) {
      return true
    }
    return false
  }

  const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
      throw new Error ("Missing or incorrect discharge: " + discharge)
    } 
    return discharge
  }

  let newNote = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagCodes(diagnosisCodes),
    type: parseType(type)
  }
  
  switch (newNote.type) {
    case "HealthCheck": 
      const healthCheckNote= {
        ...newNote,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      } 
      return healthCheckNote;
    case "OccupationalHealthcare":
      const occupationalNote = {
        ...newNote,
        employerName: parseEmployerName(obj.employerName),
        sickLeave: parseSickLeave(obj.sickLeave),
      }
      return occupationalNote;
    case "Hospital":
      const hospitalNote = {
        ...newNote,
        discharge: parseDischarge(obj.discharge)
      }
      return hospitalNote;
    default: 
      throw new Error("Something went wrong...")  
  }

}

