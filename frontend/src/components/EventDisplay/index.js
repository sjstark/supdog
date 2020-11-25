import React from 'react'
import { connect } from 'react-redux'

import EventCard from '../EventCard'

import './EventDisplay.css'

function EventDisplay({ events }) {
  return (
    <ul className="event-display-list">
      {events && events
        // .slice(0, 1)
        .map((event) => {

          return (
            <EventCard key={`event-${event.id}`} event={event} />
          )
        })}
    </ul>
  )
}

const mapStateToProps = state => ({ events: state.events })


export default connect(mapStateToProps)(EventDisplay)
