import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { logout } from '../../store/session'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function ProfileButton() {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  const sessionUser = useSelector(state => state.session.user)

  const openMenu = (e) => {
    if (!showMenu) {
      setShowMenu(true)
    }
  }

  useEffect(() => {
    if (!showMenu) return

    const closeMenu = () => {
      setShowMenu(false)
    }

    document.addEventListener('click', closeMenu)

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [showMenu])

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <>
      <div onClick={openMenu} className="navbar__user-container">
        <div className="navbar__user-container-dropdown">
          <i class="fas fa-caret-down"></i>
        </div>
        {sessionUser.profilePicURL && (<img className="navbar__profile-icon" src={sessionUser.profilePicURL} alt="" />)}
        {!sessionUser.profilePicURL && <FontAwesomeIcon icon={faUserCircle} className="navbar__profile-icon" />}

        <div className={`navbar__profile-dropdown ${showMenu ? "navbar__profile-dropdown--shown" : "navbar__profile-dropdown--hidden"}`}>
          <div className="navbar__dropdown-user-info">
            <div className="navbar__dropdown-text">{sessionUser.username}</div>
            <div className="navbar__dropdown-text">{sessionUser.email}</div>
          </div>
          <div className="navbar__dropdown-links">
            <Link className='navbar__dropdown-link' to="/new-event">Create A New Event</Link>
            <Link className='navbar__dropdown-link' to="/">My Events</Link>
            <Link className='navbar__dropdown-link' to="/">My Tickets</Link>
            <div className='navbar__dropdown-link' onClick={handleLogout}>Log Out</div>
          </div>
        </div>
      </div>
    </>
  )
}
