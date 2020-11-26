import React from 'react'

import { Link } from 'react-router-dom'

import './Footer.css'


//TODO: fix the image link so it doesn't reload
export default function Footer() {
  return (
    <div className="footer__wrapper">
      <div className="footer__image-wrapper">
        <Link to="/" >
          <img src="/images/Favicon-Logo.png" alt="" />
        </Link>
      </div>
      <div className="footer__links">
        <div className="footer__links-left">
          <h1 style={{ fontWeight: 'bold' }}>References</h1>
          <a target="_blank" rel="noreferrer" href="https://popdog.com/">Popdog</a>
          <a target="_blank" rel="noreferrer" href="https://www.eventbrite.com/">Eventbrite</a>
        </div>
        <div className="footer__links-right">
          <a target="_blank" rel="noreferrer" href="https://github.com/sjstark/supdog" >
            <i className="fab fa-github-square" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/samueljamesstark/">
            <i className="fab fa-linkedin" />
          </a>
        </div>
      </div>
    </div>
  )
}
