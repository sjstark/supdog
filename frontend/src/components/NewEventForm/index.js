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

  const [tickets, setTickets] = useState([])
  const [ticketType, setTicketType] = useState('')
  const [ticketQty, setTicketQty] = useState(0)

  const [errors, setErrors] = useState([])
  const [sending, setSending] = useState(false)
  const [step, setStep] = useState(0)

  const sessionUser = useSelector(state => state.session.user)

  // Redirect back to homepage if user is not logged in
  if (!sessionUser) return (<Redirect to='/' />)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true)

    setErrors([])

    const event = { title, summary, about, eventPic, organizer: sessionUser.id, tickets: JSON.stringify(tickets) }

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

  const addTicket = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const ticket = { name: ticketType, quantity: ticketQty }
    setTickets([...tickets, ticket])
    setTicketType('')
    setTicketQty(0)
  }

  const nextPage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setStep(step + 1)
  }

  const lastPage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setStep(step - 1)
  }

  const EventDetailsForm = (
    <form className="event-create-form">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>
          Event Title:
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Summary:
          <textarea rows={2} cols={50} value={summary} onChange={({ target }) => setSummary(target.value)} />
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
      <button onClick={() => history.replace('/')}>Cancel Event Creation</button>
      {!sending && <button onClick={nextPage}>Next Step</button>}
      {sending && <button disabled={true}>Next Step</button>}

    </form>
  )

  const removeTicket = (idx) => {
    setTickets([...tickets.slice(0, idx), ...tickets.slice(idx + 1)])
  }

  const TicketCreateForm = (
    <>
      <form onSubmit={handleSubmit} className="ticket-create-form">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
          <label>
            Ticket Title:
            <input type="text" value={ticketType} onChange={({ target }) => setTicketType(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Quantity Available:
            <input type='number' value={ticketQty} onChange={({ target }) => setTicketQty(target.value)} />
          </label>
        </div>
        <button onClick={() => history.replace('/')}>Cancel Event Creation</button>
        <button onClick={lastPage}>Go Back</button>
        <button onClick={addTicket}>Create Current Ticket</button>
        {(tickets.length >= 1) && (<button type='submit'>Create Event</button>)}
        {!(tickets.length >= 1) && (<button disabled={true} type='submit'>Create Event</button>)}

        {/* {!sending && <button type="submit">Create Event</button>}
        {sending && <button disabled={true}>Create Event</button>} */}

      </form>
      <ul>
        {tickets && tickets.map((ticket, idx) => {
          return (
            <li key={ticket.name}>
              <span>Ticket Type: {ticket.name} </span>
              <span>Quanitity: {ticket.quantity}</span>
              <button onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                removeTicket(idx)
              }}>Remove Ticket</button>
            </li>
          )
        })}
      </ul>
    </>
  )

  const formSteps = [
    EventDetailsForm,
    TicketCreateForm
  ]

  return (
    <>
      {formSteps[step]}
    </>
  )
}
