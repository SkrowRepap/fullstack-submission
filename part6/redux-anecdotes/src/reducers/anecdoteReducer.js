import AnecdoteServices from "../services/AnecdoteServices";

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTE': {
      return action.data
    }

    case 'CREATE_ANECDOTE': {
      return [...state, action.data]
    }

    case 'DELETE_ANECDOTE': {
      const id = action.data.id;

      return state.filter(anecdotes =>
        anecdotes.id !== id
        )
    }

    case 'INCREMENT_VOTE': {
      const id = action.data.id;
      const anecdoteChange = state.find(anec => anec.id === id)
      const changedAnecdote = {
        ...anecdoteChange,
        votes: anecdoteChange.votes + 1
      }
      return state.map(anecdotes =>
        anecdotes.id !== id ? anecdotes : changedAnecdote
      )
    }

    default: return state
    
  }

}

export const initAnecdote = () => {
  return async dispatch => {
    const anecdote = await AnecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdote
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT_VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await AnecdoteServices.createAnecdote(data)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote 
    })
  }
}

export const deleteAnecdote = (id) => {
  return async dispatch => {
    const deletedAnecdote = await AnecdoteServices.deleteAnecdote(id)
    dispatch({
      type: 'DELETE_ANECDOTE',
      data: { id }
    })
  }
}

export const sortAnectode = (anecdote) => anecdote.sort((firstElem, secondElem) => secondElem.votes - firstElem.votes)


export default anecdoteReducer