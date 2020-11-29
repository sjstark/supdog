import React from 'react'

import { fetch } from '../../store/csrf'

export default function TicketCard({ticketSale, alter}) {
  const ticket = ticketSale.Ticket;
  const event = ticket.Event;

  const refundOne = async () => {
    await fetch(`/api/tickets/${ticketSale.ticketId}/one`, {
      method: 'DELETE'
    })
    alter(true)
  }

  const refundAll = async () => {
    await fetch(`/api/tickets/${ticketSale.ticketId}/all`, {
      method: 'DELETE'
    })
    alter(true)
  }

  return (
    <div>
      <div>
        <img src={event.eventPicURL} alt="" width="100px" height="50px"/>
      </div>
      <div>
        <h1>{event.title}</h1>
        <h2>{ticket.name}</h2>
        <h3>{ticketSale.count}</h3>
        <div>
          <div className="button button--small button--primary" onClick={refundOne}>Refund 1 Ticket</div>
          <div className="button button--small button--warning" onClick={refundAll}>Refund All Tickets</div>
        </div>
      </div>
    </div>
  )
}
