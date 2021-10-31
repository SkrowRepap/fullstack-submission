import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form.js';
import Person from './components/Person';
import Filter from './components/Filter.js';
import axios from 'axios';


function App () {

  const [persons, setPersons] = useState([])

  const [filterPersons, setFilter] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNumber] = useState('')

  const [newfilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log('success', response)
        const contact = response.data
        setPersons(contact)
      })

  },[])

  const addPerson = (e) => {

    e.preventDefault()

    const person = {
      id: persons.length + 1,
      number: newNumber,
      name: newName,
    }
    
    let hasDuplicates = persons.filter((current) => {
      return current.name === person.name
    })

    if(hasDuplicates.length === 1) {
      alert(`${newName} already exists!`)
    }
    else {
    setPersons(persons.concat(person))
    setNewName('')
    setNumber('')
    }
  }

  const filtered = (e) => {
    e.preventDefault()
    let filtered = persons.filter((person) => person.name === newfilter)
    setFilter(filterPersons.concat(filtered));
    setNewFilter('')
  }

  return (
    <div>
      {/* Filter */}
      <Filter 
        onSubmit={filtered}
        filterValue={newfilter}
        onFilterChange={(e) => setNewFilter(e.target.value)}
        filtered={filterPersons}/>
      {/* Phonebook */}
      <h2>Phonebook</h2>
      <Form 
        onSubmit={addPerson}
        personValue={newName} 
        onPersonChange= {(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        onNumberChange= {(e) => setNumber(e.target.value)} />
      
      {/* Numbers */}
      <h2>Numbers</h2>
      {persons.map((person) => 
        <Person key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default App;
