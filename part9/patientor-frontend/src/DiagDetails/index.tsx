import React, { useState, useEffect } from "react";
import axios from "axios";

import { Diagnosis, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const DiagDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [codeDetails, setCodeDetails] = useState<Diagnosis[] | undefined>();

  useEffect(() => {
    const fetchDiagList = async () => {
      try {
        const { data: diagListFromApi } = await axios.get(
          `${apiBaseUrl}/api/diagnoses`
        );
        setCodeDetails(diagListFromApi);
      } catch (e) {
        console.error(e);
      }
    };
      fetchDiagList();
  }, []);

  const style = {
    border: "1px solid black",
    margin: "10px",
    padding: "5px",
    minWidth: "300px"
  }

  switch (entry.type) {
    case "HealthCheck": 
      return (
        <div style={style}>
          <p>Date: {entry.date}</p>
          <br />
          <p>Specialist: {entry.specialist}</p>
          <br />
          <p>Description: {entry.description}</p>
          
          <ul>
            {entry.diagnosisCodes?.map((diag) => {
              let diagnosis;
              if (codeDetails) {
                diagnosis = codeDetails.find(obj => obj.code === diag);
              } 
              if (diagnosis) {
                return <li key={diag}>{diag}: {diagnosis.name}</li>
              } else {
                return <li key={diag}>{diag}: "Loading..."</li>
              }
              
            })}
          </ul>
          <p>HealthCheck rating: {entry.healthCheckRating}</p>
        </div>
      )
    case "OccupationalHealthcare":
      return (
        <div style={style}>
          <p>Date: {entry.date}</p>
          <br />
          <p>Specialist: {entry.specialist}</p>
          <br />
          <p>Description: {entry.description}</p>
          
          <ul>
            {entry.diagnosisCodes?.map((diag) => {
              let diagnosis;
              if (codeDetails) {
                diagnosis = codeDetails.find(obj => obj.code === diag);
              } 
              if (diagnosis) {
                return <li key={diag}>{diag}: {diagnosis.name}</li>
              } else {
                return <li key={diag}>{diag}: "Loading..."</li>
              }
              
            })}
          </ul>
          <p>Employer: {entry.employerName}</p>
          <p>{entry.sickLeave ? `Sick leave taken from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}` : "No sick leave"}</p>
        </div>
      )
      case "Hospital":
        return (
          <div style={style}>
            <p>Date: {entry.date}</p>
            <br />
            <p>Specialist: {entry.specialist}</p>
            <br />
            <p>Description: {entry.description}</p>
            
            <ul>
              {entry.diagnosisCodes?.map((diag) => {
                let diagnosis;
                if (codeDetails) {
                  diagnosis = codeDetails.find(obj => obj.code === diag);
                } 
                if (diagnosis) {
                  return <li key={diag}>{diag}: {diagnosis.name}</li>
                } else {
                  return <li key={diag}>{diag}: "Loading..."</li>
                }
                
              })}
            </ul>
            <p>Discharge date: {entry.discharge.date}</p>
            <p>Discharge criteria: {entry.discharge.criteria}</p>
          </div>
        )
      default:
          return <p>Something went wrong...</p>
  }
};

export default DiagDetails;
