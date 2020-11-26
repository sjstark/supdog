import React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';

import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormPage';

import './Navigation.css'
import { changeView } from '../../store/view';


export default function Navigation({ isLoaded }) {
  const history = useHistory()
  const dispatch = useDispatch()

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

  const logoClick = (e) => {
    e.stopPropagation();
    dispatch(changeView(null))
    history.push('/')
  }

  return (
    <div className="navbar__container">
      <div className="navbar__logo" onClick={logoClick}><img src="/images/'SupDog-Logo.png" alt='' width="150px" /></div>
      <div className="navbar__right-container">
        <div className="navbar__search">
          <i className="fas fa-search"></i>
        </div>
        <div className="navbar__links">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  )
}
