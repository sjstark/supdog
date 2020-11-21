import React, {useState} from 'react'

import {Modal} from '../../context/Modal'
import LoginForm from './LoginForm'

export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => {
          console.log('showing modal')
          setShowModal(true)
        }}>Log In</button>
      {showModal && (
        <>
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        </>
      )}
    </>
  )
}
