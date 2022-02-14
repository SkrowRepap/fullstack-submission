
import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createdAnecdoteNotif } from "../reducers/notificationReducer"



const AnecdoteForm = (props) => {

    const createNew = async (event) => {
        event.preventDefault()

        const content = event.target.content.value
        event.target.content.value = ''

        props.createAnecdote(content)

        props.createdAnecdoteNotif(`Created anecdote: '${content}'`, 5)

    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={createNew}>
                <div><input name='content' /></div>
                <button>Create</button>
            </form>
        </div>
    )
}

const mapDispatchProps = {
    createAnecdote,
    createdAnecdoteNotif
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchProps
) (AnecdoteForm)

export default ConnectedAnecdoteForm