import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { fetch } from '../../store/csrf'
import TicketItem from '../TicketItem'

import './EventDetails.css'

export default function EventDetails() {

  let { id } = useParams()
  const [event, setEvent] = useState(null)

  const getEvent = async () => {
    const res = await fetch(`/api/events/${id}`)
    setEvent(res.data)
  }


  useEffect(() => {
    getEvent()
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
                {/* <h1 className="event-detail__header-date"></h1> */}
                <h1 className="event-detail__header-title">{event.title}</h1>
                <h1 className="event-detail__header-organizer">{'by '}
                  <img className="event-detail__header-organizer-pic" src={event.organizer.profilePicURL} alt="" />
                  {event.organizer.username}</h1>
              </div>
            </div>
            <div className="event-details__body">
              <div className="event-details__body-left">
                <span >{event.summary}</span>
                <h3>About this Event</h3>
                <p>{event.about}</p>
              </div>
              <div className="event-details__body-right">
                <h1 style={{ fontSize: "24px" }}>
                  Tickets
                </h1>
                {event.tickets.map(ticket => {
                  return <TicketItem key={ticket.id} ticket={ticket} getEvent={getEvent} />
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
