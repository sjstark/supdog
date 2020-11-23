import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'

import './LoginForm.css'

export default function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({credential, password}))
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>
          Email or Username:
          <input required type="text" value={credential} onChange={({target}) => setCredential(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Password:
          <input required type="password" value={password} onChange={({target}) => setPassword(target.value)} />
        </label>
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}
