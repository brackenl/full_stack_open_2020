import React, { useState, useEffect } from "react";

import noteService from "../../Services/numberService";

import Notification from "../Notification/Notification";
import Filter from "../Filter/Filter";
import NewPersonForm from "../NewPersonForm/NewPersonForm";
import NumbersDisplay from "../NumbersDisplay/NumbersDisplay";
import numberService from "../../Services/numberService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAllPersons();
  }, []);

  const getAllPersons = () => {
    noteService.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNum,
    };

    const samePerson = persons.filter(
      (person) => person.name === newPerson.name
    );
    if (samePerson.length > 0) {
      const result = window.confirm(
        `${newPerson.name} is already added to the phonebook. Update the number associated with this contact?`
      );
      if (result) {
        numberService
          .updatePerson(samePerson[0].id, newPerson)
          .then((updated) => {
            getAllPersons();
          })
          .then((result) => {
            setNotification({
              message: `${newPerson.name} was updated in the phonebook`,
              error: false,
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch((error) => {
            setNotification({
              message: `${newPerson.name} was not found in the phonebook`,
              error: true,
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          });
      }
    } else {
      numberService
        .addPerson(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNum("");
        })
        .then((result) => {
          setNotification({
            message: `${newPerson.name} was added to the phonebook`,
            error: false,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch((error) => {
          setNotification({
            message: `${newPerson.name} was not found in the phonebook`,
            error: true,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }
  };

  const handleDelete = (id) => {
    const relPerson = persons.find((person) => person.id === id);
    const result = window.confirm(
      `Do you really want to delete ${relPerson.name}?`
    );
    if (result) {
      numberService.deletePerson(id).then((deleted) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <NewPersonForm
        handleSubmit={handleSubmit}
        handleNumChange={handleNumChange}
        handleNameChange={handleNameChange}
        newName={newName}
        newNum={newNum}
      />

      <NumbersDisplay
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
