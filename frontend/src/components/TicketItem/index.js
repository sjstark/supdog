import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'


import { fetch } from '../../store/csrf'

import './TicketItem.css'

export default function TicketItem({ ticket, getEvent }) {
  let isSoldOut = ticket.sold >= ticket.quantity

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    isSoldOut = ticket.sold >= ticket.quantity
  }, [ticket])

  const registerUser = async (e) => {
    e.stopPropagation();
    e.target.onClick = null

    e.target.classList.add('button--disabled')

    await fetch(`/api/tickets/${ticket.id}`, {
      method: 'POST'
    })

    let successEl = e.target.parentElement.querySelector('.success')
    successEl.classList.add('shown')
    setTimeout(() => {
      successEl.classList.remove('shown')
    }, 100)

    e.target.classList.remove('button--disabled')

    e.target.onClick = registerUser

    // Reloads event in case ticket is sold out
    // (really this should be done with Redux...)
    await getEvent()
  }

  return (
    <div className="ticket-item__wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="ticket-item__name">{ticket.name}</h2>
        <h2 className="ticket-item__tickets-left">{ticket.quantity - ticket.sold} Left</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {sessionUser && !isSoldOut && (
          <div onClick={registerUser} className="button button--small button--primary">Register</div>
        )}
        {!sessionUser && !isSoldOut && (
          <div className="button button--small button--disabled" style={{fontSize:'10px'}}>Please Log In </div>
        )}
        {isSoldOut && (
          <div className="button button--small button--disabled">Sold Out</div>
        )}

        <div className="success">Success!</div>
      </div>
    </div >
  )
}
