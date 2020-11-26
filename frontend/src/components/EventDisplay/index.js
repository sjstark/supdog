import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { clearEvents, loadMoreEvents } from '../../store/event'

import EventCard from '../EventCard'

import './EventDisplay.css'

function EventDisplay({ events, view }) {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      dispatch(clearEvents())
      dispatch(loadMoreEvents(0, 10, view))
    })()
  }, [view])

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

const mapStateToProps = state => ({ events: state.events, view: state.view })


export default connect(mapStateToProps)(EventDisplay)
