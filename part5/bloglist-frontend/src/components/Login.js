
import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Login = (event) => {
    event.preventDefault()
    handleLogin(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1> Log in </h1>
      <form onSubmit={Login}>
        <div>
                    username
          <input
            type='text'
            value={username}
            id='username'
            onChange={event => { setUsername(event.target.value) }}
          />
        </div>
        <div>
                    password
          <input
            type='password'
            value={password}
            id='password'
            onChange={event => { setPassword(event.target.value) }}
          />
        </div>

        <button type='submit' id='loginButton'>Log in</button>
      </form>
    </div>
  )
}

export default LoginForm