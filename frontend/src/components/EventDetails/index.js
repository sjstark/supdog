import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { fetch } from '../../store/csrf'

import './EventDetails.css'

export default function EventDetails() {

  let { id } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/events/${id}`)
      setEvent(res.data)
    })()
  }, [id])

  return (
    <>
      {event && (
        <div className="event-details__container">
          <div className="event-details__background-container">
            <div className="event-details__background-image-container">
              <img className="event-details__background-image" src={event.eventPicURL} alt="" />
            </div>
          </div>
          <div className="event-details__content">
            <div className="event-details__header">
              <div className="event-details__header-left">
                <img className="event-details__header-image" src={event.eventPicURL} alt="" />
              </div>
              <div className="event-details__header-right">
                <h1 className="event-detail__header-date"></h1>
                <h1 className="event-detail__header-title">{event.title}</h1>
                <h1 className="event-detail__header-organizer">by {event.organizer.username}</h1>
              </div>
            </div>
            <div className="event-details__body">
              <div className="event-details__body-left">
                <p>{event.summary}</p>
                <p>{event.about}</p>
              </div>
              <div className="event-details__bady-right">
                <div>TICKETS</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
