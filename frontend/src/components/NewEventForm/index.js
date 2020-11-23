import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Redirect, useHistory } from 'react-router-dom'

import { createNewEvent } from '../../store/event'


export default function NewEventForm() {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [about, setAbout] = useState('')
  const [eventPic, setEventPic] = useState(null)
  const [eventPicPreview, setEventPicPreview] = useState(null)
  const [errors, setErrors] = useState([])
  const [sending, setSending] = useState(false)

  const sessionUser = useSelector(state => state.session.user)

  // Redirect back to homepage if user is not logged in
  if (!sessionUser) return (<Redirect to='/' />)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true)

    setErrors([])

    const event = { title, summary, about, eventPic, organizer: sessionUser.id }

    return createNewEvent(event)
      .then((res) => {
        if (res.statusText !== 'OK') throw res
        else {
          history.push('/')
        }
      })
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
          setSending(false)
        }
      })
  }

  const updateFile = async (e) => {

    const { target:
      {
        validity,
        files: [file]
      }
    } = e;


    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setEventPicPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }

    return validity.valid && setEventPic(file);
  }


  return (
    <form onSubmit={handleSubmit} className="event-create-form">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>
          Event Title:
          <input required type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Summary:
          <textarea required rows={2} cols={50} value={summary} onChange={({ target }) => setSummary(target.value)} />
        </label>
      </div>
      <div>
        <label>
          About:
          <textarea value={about} rows={10} cols={50} onChange={({ target }) => setAbout(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Event Picture:
          <input id='event-pic-upload' type="file" onChange={updateFile} />
        </label>
        {eventPicPreview && (<img width="500px" id="event-pic-preview" src={eventPicPreview} alt="Loading Event Pic..." />)}
      </div>
      {!sending && <button type="submit">Create Event</button>}
      {sending && <button disabled={true}>Create Event</button>}

    </form>
  )
}
