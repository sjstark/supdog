import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
      <button onClick={openMenu} className="profileIcon">
        {sessionUser.profilePicURL && (<img src={sessionUser.profilePicURL} alt="" style={{ width: '30px', height: '30px' }} />)}
        {!sessionUser.profilePicURL && <FontAwesomeIcon icon={faUserCircle} className="navBar__profile-icon" />}
      </button>
      {showMenu && (
        <div className="navbar__profile-dropdown">
          <div>{sessionUser.username}</div>
          <div>{sessionUser.email}</div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </>
  )
}
