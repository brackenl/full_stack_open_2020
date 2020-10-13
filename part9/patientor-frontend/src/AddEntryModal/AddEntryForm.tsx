import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, SelectField, DiagnosisSelection, TypeOption } from "./FormField";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Type, NewEntry } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues =   
| Omit<HospitalEntry, "id">
| Omit<OccupationalHealthcareEntry, "id">
| Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: NewEntry) => void; // NEED TO UPDATE FOR ALL ENTRY FORM VALUES
    onCancel: () => void;
    mode: Type;
  }

const typeOptions: TypeOption[] = [
  { value: Type.Health, label: "HealthCheck" },
  { value: Type.Occupational, label: "OccupationalHealthcare" },
  { value: Type.Hospital, label: "Hospital" },
];


const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, mode }) => {
    const [{ diagnoses }] = useStateValue()

    let initialValues: any = {
      type: mode,
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
    };
    let optionalFields: any;
  
    switch (mode) {
      case Type.Health:
        optionalFields = (            
          <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
         />
        );
        initialValues.healthCheckRating = 0;
        break;
      case Type.Occupational:
        optionalFields = (
          <div>
            <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />

            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            /> 

            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            /> 

          </div>
        );
        initialValues = {
          ...initialValues,
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          }
        }
        break;

      case Type.Hospital:

        optionalFields = (
          <div>

            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            /> 

            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />

          </div>
        );
        initialValues = {
          ...initialValues,
          discharge: {
            date: '',
            criteria: ''
          }
        }
        break;

      default:
        console.log("Something went wrong...")
    }


    return (
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            
            <SelectField label="Type" name="type" options={typeOptions} />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
  
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    

            {optionalFields}
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddEntryForm;