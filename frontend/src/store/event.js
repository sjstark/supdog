import Axios from 'axios'

const ADD_EVENT = 'events/addEvent'

export const createNewEvent = (event) => {
  const { title, summary, organizer, about, eventPic, tickets } = event

  const formData = new FormData();
  formData.append('title', title)
  formData.append('summary', summary)
  formData.append('organizer', organizer)
  formData.append('tickets', tickets)
  if (about) {
    formData.append('about', about)
  }
  if (eventPic) {
    formData.append('eventPic', eventPic)
  }

  // tickets.forEach((ticket, idx) => {
  //   formData.append(`ticket${idx}`, JSON.stringify(ticket))
  // })

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return Axios.post('/api/events/', formData, config)
    .catch((err) => {
      return err.response
    })

}

const initialState = {
  events: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case ADD_EVENT:
      return { ...state, ...payload }

    default:
      return state
  }
}
