import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form.js';
import Person from './components/Person';
import Filter from './components/Filter.js';
import axios from 'axios';
import contactservice from './services/contactservice';
import Notify from './components/Notification';
import ButtonDelete from './components/Button';



function App () {

  const [persons, setPersons] = useState([])

  const [filterPersons, setFilter] = useState(null)

  const [newName, setNewName] = useState('')

  const [newNumber, setNumber] = useState('')

  const [findName, setFindName] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect( () => {
    axios
      .get("http://localhost:3001/api/persons")
      .then((response) => {
        const contact = response.data
        setPersons(contact)
      })
  },[persons])


  useEffect(() => {
    contactservice
      .getContact(findName)
      .then(data => {
        setFilter(data)
      })
  }, [findName])

  const addPerson = (e) => {
    e.preventDefault()

    const person = {
      number: newNumber,
      name: newName,
    }
    
    let hasDuplicates = persons.find(current => current.name === person.name)

    if(hasDuplicates) {
      let update = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (update) {
        contactservice
          .updateContact(hasDuplicates.id, person)
          .then((data) => {
            setPersons(persons.map(person => person.id !== hasDuplicates.id ? person : data))
            const notif = {
              contactName: newName,
              tag: 'Success',
              message: 'succesfully updated!'
            }
            setNotification(notif)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            const notif = {
              contactName: newName,
              tag: 'Error',
              message: 'was already deleted to the server!'
            }
            setNotification(notif)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }

    } else {

      contactservice
        .addContact(person)
        .then(data => setPersons(persons.concat(data)))
        .then(() => {
              const notif = {
                contactName: newName,
                tag: 'Success',
                message: 'succesfully added!'
              }
          setNotification(notif)
          setTimeout(() => {
          setNotification(null)
          }, 5000)
        })

    setNewName('')
    setNumber('')
    }
  }


  return (
    <div>
      {/* Filter */}
      <Filter 
        filterValue={findName}
        onFilterChange={(e) => setFindName(e.target.value)}
        filtered={filterPersons}/>


      {/* Phonebook */}

      {notification ?
        <Notify tag={notification.tag} message={notification.message} contactName={notification.contactName}/> : null }
      <h2>Phonebook</h2>
      <Form 
        onSubmit={addPerson}
        personValue={newName} 
        onPersonChange= {(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        onNumberChange= {(e) => setNumber(e.target.value)} />
      
      {/* Numbers */}
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <div classname="margin-bottom-10px" key={person.id}>
        <Person  name={person.name} number={person.number}/>
        <ButtonDelete id={person.id} name={person.name} updateNotif={notif => setNotification(notif)}/>
        </div>
        )
      }
      )}
    </div>
  )
}

export default App;
