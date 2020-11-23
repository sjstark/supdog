import React from 'react';
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProfileButton from './ProfileButton';

import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormPage';

import './Navigation.css'


export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton />
    )
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    )
  }

  return (
    <ul>
      <NavLink exact to='/'>Home</NavLink>
      {isLoaded && sessionLinks}
    </ul>
  )
}
