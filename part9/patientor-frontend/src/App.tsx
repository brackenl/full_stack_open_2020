import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, createPatient, setAllPatients } from "./state";
import { Patient } from "./types";

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
        // dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
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

  // const relPatient = {
  //   id: "d2773336-f723-11e9-8f0b-362b9e155667",
  //   name: "John McClane",
  //   dateOfBirth: "1986-07-09",
  //   ssn: "090786-122X",
  //   gender: Gender.Male,
  //   occupation: "New york city cop",
  //   entries: [],
  // };

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
