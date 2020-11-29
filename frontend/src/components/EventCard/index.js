import React, { useState, useEffect } from 'react'
import * as formatDate from 'date-format'

import { useHistory } from 'react-router-dom'

import { fetch } from '../../store/csrf'

import './EventCard.css'

function TicketItem({ ticket }) {
  return (
    <li className="event-card__background-ticket-item">
      {ticket.name}
    </li>
  )
}


export default function EventCard({ event }) {
  const history = useHistory()

  const [nextDate, setNextDate] = useState('')

  const { id, title, organizer, eventPicURL, summary, tickets } = event

  const [left, avail] = tickets.reduce((acc, ticket) => {
    acc[1] += ticket.quantity;
    acc[0] += ticket.quantity - ticket.sold;
    return acc
  }, [0, 0])

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/events/${event.id}/next-date`)
      let date
      if (res.data === 0) date = 'Over'
      else {
        date = formatDate.asString(
          'MM/dd',
          new Date(res.data)
        )
      }

      setNextDate(date)
    })()

  }, [event])

  const handleClick = (e) => {
    e.stopPropagation()
    history.push(`/events/${id}`)
  }

  return (
    <div key={`event-${id}`} className="event-card__wrapper" onClick={handleClick}>
      <div className="event-card__date-banner">{nextDate}</div>
      <h1 className="event-card__floating-details-title">{title}</h1>

      <div className='event-card__foreground'>
        <div className="event-card__picture-wrapper">
          <img className="event-card__picture" src={eventPicURL} alt="" />
        </div>
        <div className="event-card__foreground-details">
          <h1 className="event-card__foreground-details-title">{title}</h1>
          <h2 className="event-card__foreground-details-organizer">
            Hosted by:
            <div>
              <img className='event-card__organizer-pic' src={organizer.profilePicURL} alt="" />
              <span>{organizer.username}</span>
            </div>
          </h2>
          <h2 className="event-card__foreground-details-ticket-count">
            <i className="fas fa-ticket-alt" />
            <span>{`${left} `}</span>
            out of
            <span>{` ${avail} `}</span>
            remaining
          </h2>
        </div>
      </div>
      <div className='event-card__background'>
        <img className="event-card__background-image" src={eventPicURL} alt="" />
        <div className="event-card__background-details">
          <h1 className="event-card__background-title">{title}</h1>
          <h2 className="event-card__background-summary">{summary}</h2>
          <ul className="event-card__background-tickets">
            <span>Ticket Types:</span>
            {tickets.map(ticket => {
              return <TicketItem key={ticket.id} ticket={ticket} />
            })}
          </ul>
        </div>
        <div className="button button--primary">SEE MORE</div>
      </div>
    </div>
  )
}
