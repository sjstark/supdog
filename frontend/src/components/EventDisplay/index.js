import React, { useState, useEffect } from 'react'
import { fetch } from '../../store/csrf'

import EventCard from '../EventCard'


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
