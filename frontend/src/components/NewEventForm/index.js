import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Redirect, useHistory } from 'react-router-dom'

import { createNewEvent } from '../../store/event'

import ImageInput from '../ImageCropper/ImageInput'
import FormInput from '../FormInput'
import FormInputField from '../FormInputField'
import FormDropDown from '../FormDropDown'

import { fetch } from '../../store/csrf'



export default function NewEventForm() {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [about, setAbout] = useState('')

  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [eventPic, setEventPic] = useState(null)

  const [tickets, setTickets] = useState([])
  const [ticketType, setTicketType] = useState('')
  const [ticketQty, setTicketQty] = useState(0)

  const [errors, setErrors] = useState([])
  const [sending, setSending] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    (async () => {
      let categoriesJSON = await fetch(`/api/categories`)

      setCategories(categoriesJSON.data)
    })();

  }, [])



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
      <h1>Event Details</h1>
      <div>
        <FormInput name='Event Title' required={true} maxLength={50} type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        <FormInputField name='Event Summary' required={true} maxLength={120} rows={2} cols={60} value={summary} onChange={({ target }) => setSummary(target.value)} />
        <FormInputField name='About' required={true} rows={12} cols={60} value={about} onChange={({ target }) => setAbout(target.value)} />
        <FormDropDown name="Category" required={true} options={categories} value={categoryId} onChange={({target}) => setCategoryId(target.value)} />
      </div>

      {/* <div>
        <label>
          Event Picture:
          <span>2160px x 1080px (2:1 ratio)</span>
        </label>
        <ImageInput aspect={2} onChange={setEventPic} height={1080} width={2160} />
      </div> */}
      <button onClick={() => history.replace('/')}>Cancel Event Creation</button>
      {!sending && <button onClick={nextPage}>Next Step</button>}
      {sending && <button disabled={true}>Next Step</button>}

    </form>
  )

  const EventImageForm = (
    <form className="event-create-form">
      <h1>Event Image</h1>
      <div>
      <div>
        <label>
          Event Picture:
          <span>2160px x 1080px (2:1 ratio)</span>
        </label>
        <ImageInput aspect={2} onChange={setEventPic} height={1080} width={2160} />
      </div>      </div>


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
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {formSteps[step]}
    </>
  )
}
