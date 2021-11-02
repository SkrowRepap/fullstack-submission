import axios from "axios";
import React from "react";
const baseUrl = `http://localhost:3001/persons`

const addContact = contactObject => {
    const request = axios.post(baseUrl,contactObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    const request = axios.delete(baseUrl + `/${id}`)
    return request.then(response => response.data)
}

const updateContact = (id, updateObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updateObject)
    return request.then(response => response.data)
}

const getContact = name => {
    const request = axios.get(baseUrl + `?name_like=${name}`)
    return request.then(response => response.data)
}

export default { getContact, addContact, deleteContact, updateContact}