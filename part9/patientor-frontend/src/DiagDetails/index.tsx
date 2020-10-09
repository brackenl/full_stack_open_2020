import React, { useState, useEffect } from "react";
import axios from "axios";

import { Patient, Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const DiagDetails: React.FC<{ patient: Patient }> = ({ patient }) => {
  // const getDiagDetails = (code) => {};
  const [codeDetails, setCodeDetails] = useState([]);
  const [codePairs, setCodePairs] = useState([]);

  useEffect(() => {
    const fetchDiagList = async () => {
      try {
        const { data: diagListFromApi } = await axios.get(
          `${apiBaseUrl}/api/diagnoses`
        );
        console.log(diagListFromApi);
        setCodeDetails(diagListFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagList();
  }, []);

  const getDetail = (code: any) => {
    const relItem: Diagnosis | null = codeDetails.find(
      (item: any) => item.code === code
    );
    if (relItem) {
      return { name: relItem.name, latin: relItem.latin };
    }
  };

  patient.entries.forEach(async (entry) => {
    if (entry.diagnosisCodes) {
      entry.diagnosisCodes.forEach((code) => {
        setCodePairs([
          ...codePairs,
          {
            code: code,
            desc: getDetail(code),
          },
        ]);
      });
    }
  });

  return <div></div>;
};

export default DiagDetails;
