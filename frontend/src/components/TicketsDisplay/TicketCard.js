import React from 'react'

import { useHistory } from 'react-router-dom'

import { fetch } from '../../store/csrf'

import './TicketCard.css'

export default function TicketCard({ticketSale, alter}) {
  const history = useHistory()

  const ticket = ticketSale.Ticket;
  const event = ticket.Event;

  const refundOne = async (e) => {
    e.stopPropagation()
    await fetch(`/api/tickets/${ticketSale.ticketId}/one`, {
      method: 'DELETE'
    })
    alter(true)
  }

  const refundAll = async (e) => {
    e.stopPropagation()
    await fetch(`/api/tickets/${ticketSale.ticketId}/all`, {
      method: 'DELETE'
    })
    alter(true)
  }

  const eventDetails = () => {
    history.push(`/events/${event.id}`)
  }

  return (
    <div className="ticket-card__wrapper" onClick={eventDetails}>
      <div className="ticket-card__image-wrapper">
        <img src={event.eventPicURL} alt=""/>
      </div>
      <div className="ticket-card__details">
        <h1 className="ticket-card__title">
          <span className="ticket-card__title-bold">
            {'Event: '}
          </span>
          {event.title}
        </h1>
        <h2 className="ticket-card__ticket-name">
          <span className="ticket-card__title-bold">
            {'Ticket Type: '}
          </span>
          {ticket.name}
        </h2>
        <h3 className="ticket-card__owned">
          <span className="ticket-card__title-bold">
            {'Quantity Owned: '}
          </span>
          {ticketSale.count}
        </h3>
        <div className="ticket-card__buttons-container">
          <div className="button button button--primary" onClick={refundOne}>Refund One Ticket</div>
          <div className="button button button--warning" onClick={refundAll}>Refund All Tickets</div>
        </div>
      </div>
    </div>
  )
}
