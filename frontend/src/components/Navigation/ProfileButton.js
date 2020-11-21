import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {logout} from '../../store/session'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function ProfileButton({sessionUser}) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  const openMenu = (e) => {
    if (!showMenu){
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
      <button onClick={openMenu}>
        <FontAwesomeIcon icon={faUserCircle} className="navBar__profile-icon"/>
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
