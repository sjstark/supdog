import React, { useState, useEffect } from 'react'
import { fetch } from '../../store/csrf'

export default function EventDisplay() {
  const [events, setEvents] = useState([])

  useEffect(async () => {
    const response = await (fetch('/api/events'))

    const eventsJSON = response.data.events

    setEvents(eventsJSON)

  }, [])

  return (
    <ul>
      {events && events.map(({ id, title, organizer, eventPicURL, summary, about }) => {

        return (
          <li key={id}>
            <span>{title}</span>
            <span>{organizer}</span>
            {eventPicURL && <img src={eventPicURL} alt={`${title} picture`} />}
            <p>{summary}</p>
            <p>{about}</p>
          </li>
        )
      })}
    </ul>
  )
}
