import React from "react";
import { Redirect } from "react-router-dom";

import { Patient } from "../types";
import DiagDetails from "../DiagDetails";

const DetailsPage: React.FC<{ patient: Patient }> = (props) => {
  if (!props.patient) {
    return <Redirect to="/" />;
  }

  console.log(props.patient);

  return (
    <div>
      <h2>Name: {props.patient.name}</h2>
      <p>Gender: {props.patient.gender}</p>
      <p>Occupation: {props.patient.occupation}</p>
      <p>SSN: {props.patient.ssn}</p>
      <p>Birth date: {props.patient.dateOfBirth}</p>
      <div style={{ display: "flex" }}>
        {props.patient.entries.map((entry) => {
          return (
            <div
              style={{
                width: "300px",
                border: "1px solid black",
                padding: "5px",
              }}
              key={props.patient.id}
            >
              <h3>Diagnosis</h3>
              <p>Date: {entry.date}</p>
              <p>Description: {entry.description}</p>
              <p>Diagnosis code(s): </p>
              <ul>
                {entry.diagnosisCodes?.map((diag) => (
                  <li key={diag}>{diag}</li>
                ))}
              </ul>
            </div>
          );
        })}
        <DiagDetails patient={props.patient} />
      </div>
    </div>
  );
};

export default DetailsPage;
