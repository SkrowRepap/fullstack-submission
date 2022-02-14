import React, { useEffect } from 'react'
import {useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdote } from './reducers/anecdoteReducer'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdote())
  }, [dispatch]);
  
  return (

    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdotesList/>
      <AnecdoteForm/>
      
    </div>
  )
}

export default App