
import React, { useState, useImperativeHandle } from 'react'


const ToggleButton = React.forwardRef ((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideVisibility = { display: visible ? 'none' : '', marginTop: 20 }
  const showVisibility = { display: visible ? '' : 'none', marginTop: 20 }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })



  return (
    <div>
      <div style={hideVisibility} >
        <button onClick={toggleVisibility} className='show-button'> {props.buttonLabel} </button>
      </div>

      <div style={showVisibility} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility} className='hide-button'> {props.hideLabel} </button>
      </div>
    </div>
  )
})

ToggleButton.displayName = 'ToggleButton'

export default ToggleButton