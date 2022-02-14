
import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer, { sortAnectode } from '../reducers/anecdoteReducer'
import FilterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: FilterReducer
})

const store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(thunk)
    )
    )

store.subscribe(() => {
    sortAnectode(store.getState().anecdotes)
    console.log(store.getState());
})

export default store