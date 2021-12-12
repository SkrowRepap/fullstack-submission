
import React from 'react'
import '../App.css'

const Notification = ({ message, tag }) => {
  if (tag === null) {
    return <div></div>
  }

  if (tag.toLowerCase() === 'error') {
    return (
      <div className="notification">
        <p className="error">{message}</p>
      </div>
    )
  } else {
    return (
      <div className="notification">
        <p className="success">{message}</p>
      </div>
    )
  }
}



export default Notification