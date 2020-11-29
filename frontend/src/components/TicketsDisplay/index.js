import React, {useEffect, useState} from 'react'

import { useSelector } from 'react-redux'

import TicketCard from './TicketCard'

import { fetch } from '../../store/csrf'

export default function TicketsDisplay() {

  const sessionUser = useSelector(state => state.session.user)

  const [tickets, setTickets] = useState([]);
  const [altered, setAltered] = useState(false);

  useEffect(() => {

    (async () => {
      let ticketsJSON = await fetch(`/api/tickets`)
      ticketsJSON = ticketsJSON.data

      let data = ticketsJSON.reduce((acc, ticket) => {
        if (acc[ticket.ticketId]) {
          acc[ticket.ticketId].count ++
          return acc
        } else {
          return {...acc, [ticket.ticketId]: {...ticket, count: 1}}
        }
      }, {})

      setTickets(Object.values(data))
      setAltered(false)
    })();
  }, [sessionUser, altered])

  return (
    <div>
      {!sessionUser && <div className="message"> Please Log In to view your tickets! </div>}

      {sessionUser && (
        <>
          <div className="event-display-title">Your Tickets:</div>
            {tickets && tickets.map( (ticket, idx) => {
              return <TicketCard key={ticket.id} ticketSale={ticket} alter={setAltered}/>
          })}
          {tickets.length === 0 && (
            <div className="message">
              Your tickets are empty! Go make some reservations!
            </div>
          )}
          </>
      )}




    </div>
  )
}
