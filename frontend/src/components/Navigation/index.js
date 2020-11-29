import React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton';

import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormPage';

import './Navigation.css'
import { clearView } from '../../store/view';
import * as  sessionActions from '../../store/session'


export default function Navigation({ isLoaded }) {
  const history = useHistory()
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const loginAsDemo = (e) => {
    e.stopPropagation();
    const credential = 'demo@user.io'
    const password = 'password'

    return dispatch(sessionActions.login({ credential, password }))
  }

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton />
    )
  } else {
    sessionLinks = (
      <>
        <div onClick={loginAsDemo} className="button">Demo</div>
        <LoginFormModal />
        <SignupFormModal />
      </>
    )
  }

  const logoClick = (e) => {
    dispatch(clearView())
    history.push('/')
  }

  return (
    <div className="navbar__container">
      <div className="navbar__logo" onClick={logoClick}><img src="/images/'SupDog-Logo.png" alt='' width="150px" /></div>
      <div className="navbar__right-container">
        <SearchButton />
        <div className="navbar__links">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  )
}
