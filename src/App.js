import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createPerson } from './graphql/mutations';
import { listPeople } from './graphql/queries';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { firstName: '', lastName: '', dateOfBirth: ''}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetchPeople()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchPeople() {
    try {
      const peopleData = await API.graphql(graphqlOperation(listPeople))
      const people = peopleData.data.listPeople.items
      setPeople(people)
    } catch (err) { console.log('error fetchin people') }
  }

  async function addPerson() {
    try {
      if (!formState.firstName || !formState.lastName || !formState.dateOfBirth) return
      const person = { ...formState }
      setPeople([...people, person])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createPerson, {input: person}))
    } catch (err) {
      console.log('error creating a person: ', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify People</h2>
      <input
        onChange={event => setInput('firstName', event.target.value)}
        style={styles.input}
        value={formState.firstName}
        placeholder="First name"
      />
      <input
        onChange={event => setInput('lastName', event.target.value)}
        style={styles.input}
        value={formState.lastName}
        placeholder="Last name"
      />
      <button style={styles.button} onClick={addPerson}>Add Person</button>
      {
        people.map((person, index) => (
          <div key={person.id ? person.id : index} style={styles.people}>
            <p style={styles.personFirstName}>{person.firstName}</p>
            <p style={styles.personLastName}>{person.lastName}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  person: { marginBottom: 15 },
  input: { boarder: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  personFirstName: { fontSize: 20, fontWeight: 'bold' },
  personLasttName: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}


export default App;
