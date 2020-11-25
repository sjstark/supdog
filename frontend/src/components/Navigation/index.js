import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
    <div className="navbar__container">
      <Link className="navbar__logo" exact to='/'><img src="/images/'SupDog-Logo.png" width="150px" /></Link>
      <div className="navbar__right-container">
        <div className="navbar__search">
          <i class="fas fa-search"></i>
        </div>
        <div className="navbar__links">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  )
}
