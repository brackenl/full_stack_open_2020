import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_ENTRY";
      payload: {id: string, note: Entry};
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "UPDATE_ENTRY":
     const relPatient = state.patients[action.payload.id];
     relPatient.entries.push(action.payload.note);
     return {
       ...state,
       patients: {
         ...state.patients,
         relPatient
       }
     }

    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: [
          ...action.payload
        ],
      };

    default:
      return state;
  }
};

export const createPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};


export const updatePatient = (id: string, note: Entry): Action => {
  return {
    type: "UPDATE_ENTRY",
    payload: {
      id,
      note
    },
  };
};

export const setAllPatients = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const setAllDiagnoses = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList,
  };
};
