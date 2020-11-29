import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import * as formatDate from 'date-format'

import { Redirect, useHistory } from 'react-router-dom'

import { createNewEvent } from '../../store/event'

import ImageInput from '../ImageCropper/ImageInput'
import FormInput from '../FormInput'
import FormInputField from '../FormInputField'
import FormDropDown from '../FormDropDown'

import { fetch } from '../../store/csrf'

import './NewEventForm.css'
import DateItem from '../DateItem'


export default function NewEventForm() {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [about, setAbout] = useState('')
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')

  const [eventPic, setEventPic] = useState('')

  const [today, setToday] = useState(() => {
    let now = new Date();
    return formatDate.asString('yyyy-MM-ddThh:mm', now)
  })

  const [eventDates, setEventDates] = useState([])
  const [eventStartDateTime, setEventStartDateTime] = useState('')
  const [eventEndDateTime, setEventEndDateTime] = useState('')

  const [tickets, setTickets] = useState([])
  const [ticketType, setTicketType] = useState('')
  const [ticketQty, setTicketQty] = useState('')

  const [errors, setErrors] = useState([])
  const [sending, setSending] = useState(false)
  const [step, setStep] = useState(0)

  const [isComplete, setIsComplete] = useState(false)

  const checkIsComplete = () => {
    switch (step) {
      case 0 :
        if (
          (title && title.length >= 4 && title.length <= 50) &&
          (summary && summary.length >= 5 && summary.length <= 120) &&
          (categoryId)
        ) setIsComplete(true)
        else setIsComplete(false)
        break

      case 1:
        if (
          eventPic
        ) {
          setIsComplete(true)
        }
        else setIsComplete(false)
        break

      case 2:
        if (
          eventDates.length > 0
        ) {
          setIsComplete(true)
        }
        else setIsComplete(false)
        break

      case 3:
        if (
          tickets.length > 0
        ) {
          setIsComplete(true)
        }
        else setIsComplete(false)
        break

      default:
        setIsComplete(false)
        break

    }
  }

  useEffect(() => {
    (async () => {
      let categoriesJSON = await fetch(`/api/categories`)

      setCategories(categoriesJSON.data)
    })();

  }, [])

  useEffect(() => {
    checkIsComplete()

  }, [step, title, summary, about, categoryId, eventPic, eventDates, tickets])

  const sessionUser = useSelector(state => state.session.user)
  // Redirect back to homepage if user is not logged in
  if (!sessionUser) return (<Redirect to='/' />)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true)

    setErrors([])

    const event = { title, summary, about, eventPic, categoryId, organizer: sessionUser.id, tickets: JSON.stringify(tickets), dates: JSON.stringify(eventDates) }

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
    setTicketQty('')
  }

  const addDate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newEventDate = { start: new Date(eventStartDateTime), end: new Date(eventEndDateTime) }

    setEventDates([...eventDates, newEventDate])

    setEventStartDateTime('')
    setEventEndDateTime('')
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
    <>
      <form className="event-create-form">
        <h1 className="event-create-form__title">Event Details</h1>
        <div>
          <FormInput name='Event Title*' required={true} maxLength={50} type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          <FormInputField name='Event Summary*' required={true} maxLength={120} rows={2} cols={60} value={summary} onChange={({ target }) => setSummary(target.value)} />
          <FormInputField name='About' required={true} rows={12} cols={60} value={about} onChange={({ target }) => setAbout(target.value)} />
          <FormDropDown name="Category*" required={true} options={categories} value={categoryId} onChange={({target}) => setCategoryId(target.value)} />
        </div>
      </form>
      <div className="create-event__buttons-container">
        <div className="button button--warning" onClick={() => history.replace('/')}>Cancel</div>
        {isComplete && <div className="button button--primary"onClick={nextPage}>Next Step</div>}
        {!isComplete && <div className="button button--primary button--disabled">Next Step</div>}
      </div>
    </>
  )

  const EventImageForm = (
    <>
      <form className="event-image-form">
        <div className="event-image-form__header">
          <h1 className="event-create-form__title">Event Image</h1>
          <label className="event-image-form__directions">
            Event Picture: 2160px x 1080px (2:1 ratio)
          </label>
        </div>
        <div>
          <ImageInput aspect={2} value={eventPic} onChange={setEventPic} height={1080} width={2160} />
        </div>

      </form>
      <div className="create-event__buttons-container">
        <div className="button button--warning" onClick={() => history.replace('/')}>Cancel</div>
        <div className="button " onClick={lastPage}>Previous Step</div>
        {isComplete && <div className="button button--primary"onClick={nextPage}>Next Step</div>}
        {!isComplete && <div className="button button--primary button--disabled">Next Step</div>}
      </div>
    </>
  )

  const removeDate = (idx) => {
    setEventDates([...eventDates.slice(0, idx), ...eventDates.slice(idx + 1)])
  }

  const EventDatesForm = (
    <>
      <div className="date-create__wrapper">
        <form className="date-create-form">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <h1 className="event-create-form__title">Create Event Date</h1>
          <FormInput name="Event Start Date" type="datetime-local" min={today} step={60*15} value={eventStartDateTime} onChange={({ target }) => setEventStartDateTime(target.value)} />
          <FormInput name="Event End Date" type="datetime-local" min={eventStartDateTime ? formatDate('yyyy-MM-ddThh:mm', new Date(eventStartDateTime)) : today} step={60*15} value={eventEndDateTime} onChange={({ target }) => setEventEndDateTime(target.value)} />
        </form>
        <ul className="date-create-form__eventdates-container">
          <h1 className="event-create-form__title">Entered Event Dates</h1>
          {eventDates && eventDates.map((eventDate, idx) => {
            return (
              <li key={`eventDate-${eventDate.start}-${eventDate.end}`}>
                <DateItem key={idx} date={eventDate} />
                <div
                className="button button--small button--warning"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeDate(idx)
                }}>Remove Date</div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="create-event__buttons-container">
        <div className="button button--warning" onClick={() => history.replace('/')}>Cancel</div>
        <div className="button " onClick={lastPage}>Previous Step</div>
        {eventStartDateTime && eventEndDateTime && (<div className="button button--primary" onClick={addDate}>Add Event Date</div>)}
        {!(eventStartDateTime && eventEndDateTime) && (<div className="button button--primary button--disabled" >Add Event Date</div>)}
        {isComplete && <div className="button button--primary"onClick={nextPage}>Next Step</div>}
        {!isComplete && <div className="button button--primary button--disabled">Next Step</div>}
      </div>
    </>
  )

  const removeTicket = (idx) => {
    setTickets([...tickets.slice(0, idx), ...tickets.slice(idx + 1)])
  }

  const TicketCreateForm = (
    <>
      <div className="ticket-create__wrapper">
        <form className="ticket-create-form">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <h1 className="event-create-form__title">Create Ticket</h1>
          <FormInput name="Ticket Title" type="text" value={ticketType} onChange={({ target }) => setTicketType(target.value)} />
          <FormInput name="Ticket Quantity" type="number" value={ticketQty} onChange={({ target }) => setTicketQty(target.value)} />
        </form>
        <ul className="ticket-create-form__eventtickets-container">
          <h1 className="event-create-form__title">Entered Tickets</h1>
          {tickets && tickets.map((ticket, idx) => {
            return (
              <li key={`tickets-${ticket.name}-${ticket.quantity}`}>
              <span>Type: {ticket.name} </span>
              <span>Quanitity: {ticket.quantity}</span>
              <div
                className="button button--small button--warning"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeTicket(idx)
                }}>Remove Ticket</div>
            </li>
            )
          })}
        </ul>
      </div>
      <div className="create-event__buttons-container">
        <div className="button button--warning" onClick={() => history.replace('/')}>Cancel</div>
        <div className="button " onClick={lastPage}>Previous Step</div>
        {ticketType && ticketQty && (<div className="button button--primary" onClick={addTicket}>Add Ticket</div>)}
        {!(ticketType && ticketQty) && (<div className="button button--primary button--disabled" >Add Ticket</div>)}
        {!sending && isComplete && <div className="button button--primary"onClick={handleSubmit}>Create Event</div>}
        {(sending || !isComplete) && <div className="button button--primary button--disabled">Create Event</div>}
      </div>
    </>
  )

  const formSteps = [
    EventDetailsForm,
    EventImageForm,
    EventDatesForm,
    TicketCreateForm
  ]

  //change back to formSteps[step]
  return (
    <div className="new-event__form-container">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {formSteps[step]}
    </div>
  )
}
