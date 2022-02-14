
import React from 'react'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'


const Notification = (props) => {
  
  const currentState = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
  }
  
    if (currentState === '')
      return null
    else {
      setTimeout(() => {
        props.resetNotification()
      }, 5000)
      return (
        <div style={style}>
          {currentState}
        </div>
      )
    }
  
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchProps = {
  resetNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchProps

)(Notification)

export default ConnectedNotification