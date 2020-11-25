import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetch } from '../../store/csrf'

import EventCard from '../EventCard'

function EventDisplay({ events }) {

  // useEffect(async () => {
  //   const response = await (fetch('/api/events'))
  //   const eventsJSON = response.data.events
  //   // setEvents(eventsJSON)
  // }, [])

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

const mapStateToProps = state => ({ events: state.events })


export default connect(mapStateToProps)(EventDisplay)
