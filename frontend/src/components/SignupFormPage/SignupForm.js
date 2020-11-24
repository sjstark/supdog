import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import compress from 'compress.js'

import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import ImageInput from '../ImageCropper/ImageInput'

import './SignupForm.css'


// Start of profile pic resizing function
const resizeProfilePic = async (file) => {
  const resizedImage = await compress.compress([file], {
    size: 2, //Max file size set to 2Mb
    quality: 1, //Sets quality of image (max of 1),
    maxWidth: 300, //Sets the max width of the image to 300px
    maxHeight: 300, //Sets the max height of the image
    resize: true //confirm that we want to resize the picture
  })

  const img = resizedImage[0]; //compress.compress returns an array
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFile = compress.convertBase64ToFile(base64str, imgExt)
  return resizedFile
}

export default function SignupForm() {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  // const [profilePicPreview, setProfilePicPreview] = useState(null)
  const [errors, setErrors] = useState([])
  const [sending, setSending] = useState(false)

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

    setSending(true)

    const user = { email, username, firstName, lastName, profilePic, password }

    return dispatch(sessionActions.signup(user))
      .then((res) => {
        if (res.statusText !== 'OK') throw res
        return res
      })
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
          setSending(false)
        }
      })

  }

  // const updateFile = async (e) => {

  //   const { target:
  //     {
  //       validity,
  //       files: [file]
  //     }
  //   } = e;


  //   if (file) {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfilePicPreview(e.target.result)
  //     }
  //     reader.readAsDataURL(file)
  //   }

  //   return validity.valid && setProfilePic(file);
  // }


  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>
          First Name:
          <input required type="text" value={firstName} onChange={({ target }) => setFirstName(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input required type="text" value={lastName} onChange={({ target }) => setLastName(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input required type="text" value={email} onChange={({ target }) => setEmail(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input required type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input required type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input required type="password" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
        </label>
      </div>
      <div>
        <ImageInput aspect={1} onChange={setProfilePic} />
        {/* <label>
          Profile Picture:
          <input id='profile-pic-upload' type="file" onChange={updateFile} />
        </label>
        {profilePicPreview && (<img width="100px" id="profile-pic-preview" src={profilePicPreview} alt="Loading Profile Pic..." />)} */}
      </div>
      {<button type="submit">Sign Up</button>}
      {/* {!sending && <button type="submit">Sign Up</button>} */}
      {/* {sending && <button disabled={true}>Sign Up</button>} */}
    </form>
  )
}
