import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as sessionActions from '../../store/session'
import {Redirect} from 'react-router-dom'

import './SignupForm.css'

export default function SignupFormPage () {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [profilePicPreview, setProfilePicPreview] = useState(null)
  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return (<Redirect to='/' />)

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    let newErrors = [];

    if (confirmPassword !== password) {
      newErrors.push('Please make sure passwords match!')
      return setErrors(newErrors)
    }

    const user = {email, username, firstName, lastName, profilePic, password}

    return dispatch(sessionActions.signup(user))
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
        }
      })

  }

  const updateFile = (e) => {

    const { target:
      {
        validity,
        files: [file]
      }
    } = e;

    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }

    return validity.valid && setProfilePic(file);
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>
          First Name:
          <input required type="text" value={firstName} onChange={({target}) => setFirstName(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input required type="text" value={lastName} onChange={({target}) => setLastName(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Email:
          <input required type="text" value={email} onChange={({target}) => setEmail(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Username:
          <input required type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Password:
          <input required type="password" value={password} onChange={({target}) => setPassword(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input required type="password" value={confirmPassword} onChange={({target}) => setConfirmPassword(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Profile Picture:
          <input id='profile-pic-upload' type="file" onChange={updateFile} />
        </label>
        {profilePicPreview && (<img width="100px" id="profile-pic-preview" src={profilePicPreview} alt="Loading Profile Pic..." />)}
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}
