
import React from 'react';
import contactservice from '../services/contactservice';


const ButtonDelete = props => {
    const deleteButton = () => {
        let confirmMessage = window.confirm(`Are sure you want to delete ${props.name}?`)

        if (confirmMessage) {
            contactservice
                .deleteContact(props.id)
                .then(() => {
                    const notif = {
                        contactName: props.name,
                        tag: 'Success',
                        message: 'succesfully deleted!'
                    }
                    props.updateNotif(notif)
                    setTimeout(() => {
                        props.updateNotif(null)
                    }, 5000)
                })
                .catch(() => {
                    const notif = {
                        contactName: props.name,
                        tag: 'Error',
                        message: 'was already deleted to the server!'
                    }
                    props.updateNotif(notif)
                    setTimeout(() => {
                        props.updateNotif(null)
                    }, 5000)
                })
        }
    }
    return <button className="delete" onClick={deleteButton}>Delete</button>
}

export default ButtonDelete;