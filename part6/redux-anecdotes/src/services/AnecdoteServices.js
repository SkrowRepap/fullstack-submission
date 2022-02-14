import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const noteObject = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, noteObject)
    return response.data
}

const deleteAnecdote = async (id) => {
    const response = await axios.delete(baseUrl + `/${id}`)
    return id
}

export default { getAll, createAnecdote, deleteAnecdote }
