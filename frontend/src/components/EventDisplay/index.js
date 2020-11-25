import React, { useState, useEffect } from 'react'
import { fetch } from '../../store/csrf'

import './EventCard.css'

function EventCard({ event }) {
  const { id, title, organizer, eventPicURL, summary, about } = event

  return (
    <div key={`event-${id}`} className="event-card__wrapper">
      <div className='event-card__foreground'>
        <div className="event-card__picture-wrapper">
          <img className="event-card__picture" src={eventPicURL} alt="" />
        </div>
        <div className="event-card__foreground-details">
          <h1>{title}</h1>
          <h2>
            <img />
            <span>{organizer}</span>
          </h2>
          <h2>
            <i className="fas fa-ticket-alt" />
            <span>128</span>
              Left
              /
              <span>250</span>
              Avail
            </h2>
        </div>
      </div>
      <div className='event-card__background'>
        <img className="event-card__background-image" src={eventPicURL} alt="" />
        <div className="event-card__background-details">
          <h1>{title}</h1>
          <h2>{summary}</h2>
          <div className="event-card__background-stats">

          </div>
          <div className="button button--primary">SEE MORE</div>
        </div>
      </div>
    </div>
  )
}


export default function EventDisplay() {
  const [events, setEvents] = useState([])

  useEffect(async () => {
    const response = await (fetch('/api/events'))

    const eventsJSON = response.data.events

    setEvents(eventsJSON)

  }, [])

  return (
    <ul>
      {events && events.slice(0, 1).map((event) => {

        return (
          <EventCard key={`event-${event.id}`} event={event} />
        )
      })}
    </ul>
  )
}
