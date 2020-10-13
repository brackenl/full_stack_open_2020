import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, createPatient, setAllPatients, setAllDiagnoses } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import DetailsPage from "./DetailsPage";

const App: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/api/patients`
        );
        dispatch(setAllPatients(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/api/diagnoses`
        );
        dispatch(setAllDiagnoses(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatientList();
    fetchDiagnosisList();
  }, [dispatch]);

  let relPatient: Patient;

  const handleClick = async (relId: string) => {
    if (patients[relId]) {
    } else {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${relId}`
        );
        dispatch(createPatient(fetchedPatient));
      } catch (e) {
        console.error(e);
      }
    }
    relPatient = patients[relId];
  };



  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route
              path="/:id"
              render={() => <DetailsPage patient={relPatient} />}
            />
            <Route
              path="/"
              render={() => <PatientListPage clicked={handleClick} />}
            />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
