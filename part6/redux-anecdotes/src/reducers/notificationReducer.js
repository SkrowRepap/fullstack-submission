
var timerRef

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'VOTED_ANECDOTE': {
            return action.content
        }
        case 'CREATED_ANECDOTE': {
            return action.content
        }
        case 'RESET_NOTIF': {
            return action.reset
        }
        default: return state
    }
}

export const votedAnecdoteNotif = (content,seconds) => {
    console.log(timerRef);
    return dispatch => {

        clearTimeout(timerRef)
        timerRef = setTimeout(function () {
            resetNotification()
        }, seconds * 1000);

        dispatch({
            type: 'VOTED_ANECDOTE',
            content
        })
        
    }
}
export const createdAnecdoteNotif = (content, seconds) => {
    return async dispatch => {
        clearTimeout(timerRef)
        timerRef = setTimeout(function () {
            resetNotification()
        }, seconds * 1000);

        dispatch ({
            type: 'CREATED_ANECDOTE',
            content
        })
      
    }
}

export const resetNotification = () => {
    console.log('reset');
    return {
        type: 'RESET_NOTIF',
        reset: ''
    }
    
}


export default notificationReducer