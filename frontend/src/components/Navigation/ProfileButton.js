import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'

import { logout } from '../../store/session'
import { changeView } from '../../store/view'

import {fetch} from '../../store/csrf'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function ProfileButton() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [showMenu, setShowMenu] = useState(false)
  const [profilePic, setProfilePic] = useState(null)

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

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/session`)
      setProfilePic(res.data.user.profilePicURL)
    })();
  }, [sessionUser])


  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const setMyEvents = (e) => {
    e.preventDefault()
    dispatch(changeView(`MY-EVENTS`))
    history.push('/')
  }

  return (
    <>
      <div onClick={openMenu} className="navbar__user-container">
        <div className="navbar__user-container-dropdown">
          <i className="fas fa-caret-down"></i>
        </div>
        {profilePic && (<img className="navbar__profile-icon" src={profilePic + `?uniqueQuery=${encodeURI((new Date()).toISOString())}`} alt="" />)}
        {!profilePic && <FontAwesomeIcon icon={faUserCircle} className="navbar__profile-icon--default" />}

        <div className={`navbar__profile-dropdown ${showMenu ? "navbar__profile-dropdown--shown" : "navbar__profile-dropdown--hidden"}`}>
          <div className="navbar__dropdown-user-info">
            <div className="navbar__dropdown-text">{sessionUser.username}</div>
            <div className="navbar__dropdown-text">{sessionUser.email}</div>
          </div>
          <div className="navbar__dropdown-links">
            <Link className='navbar__dropdown-link' to="/new-event">Create A New Event</Link>
            <div className='navbar__dropdown-link' onClick={setMyEvents}>My Events</div>
            <Link className='navbar__dropdown-link' to="/my-tickets">My Tickets</Link>
            <div className='navbar__dropdown-link' onClick={handleLogout}>Log Out</div>
          </div>
        </div>
      </div>
    </>
  )
}
