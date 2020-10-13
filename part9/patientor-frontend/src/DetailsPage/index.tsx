import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import { Button } from "semantic-ui-react";


import DiagDetails from "../DiagDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

import { apiBaseUrl } from "../constants";
import { Entry, Patient, Type } from "../types";
import {updatePatient, useStateValue} from "../state"


const DetailsPage: React.FC<{ patient: Patient }> = (props) => {

  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Type>(Type.Health);

  const openModal = (mode: Type): void => {
    setMode(mode);
    setModalOpen(true)
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      setLoading(true);
      const { data: newNote } = await axios.post<Entry>(
        `${apiBaseUrl}/api/patients/${props.patient.id}/entries`,
        values
      );
      dispatch(updatePatient(props.patient.id, newNote));
      setLoading(false);
      closeModal();
    } catch (e) {
      setLoading(false);
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


  if (!props.patient) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Name: {props.patient.name}</h2>
      <p>Gender: {props.patient.gender}</p>
      <p>Occupation: {props.patient.occupation}</p>
      <p>SSN: {props.patient.ssn}</p>
      <p>Birth date: {props.patient.dateOfBirth}</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {props.patient.entries ? props.patient.entries.map((entry) => {
          return <DiagDetails key={entry.id + Math.random()} entry={entry} />
         }) : "Loading..."}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        mode={mode}
      />
      <Button onClick={() => openModal(Type.Health)}>Add New HealthCheck</Button>
      <Button onClick={() => openModal(Type.Occupational)}>Add New Occupational</Button>
      <Button onClick={() => openModal(Type.Hospital)}>Add New Hospital</Button>
    </div>
  );
};

export default DetailsPage;
