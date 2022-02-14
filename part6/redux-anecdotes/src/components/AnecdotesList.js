import { connect } from "react-redux"
import { deleteAnecdote, vote } from "../reducers/anecdoteReducer"
import { votedAnecdoteNotif } from "../reducers/notificationReducer"



const AnecdotesList = (props) => {
    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                        <button style={{marginLeft: 15, backgroundColor: 'red', color: 'white'}} 
                            onClick={(event) => {
                                event.preventDefault()
                                props.deleteAnecdote(anecdote.id)
                                props.votedAnecdoteNotif(`You deleted '${anecdote.content}'`, 5)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            props.vote(anecdote.id)
                            props.votedAnecdoteNotif(`You voted '${anecdote.content}'`, 5)
                            }}> 
                            Vote
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    }
    return {
        anecdotes: state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
}

const mapDispatchProps = {
    vote, votedAnecdoteNotif, deleteAnecdote
}

const ConnectAnecdotesList = connect(
    mapStateToProps,
    mapDispatchProps
)(AnecdotesList)

export default ConnectAnecdotesList