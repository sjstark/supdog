import Axios from 'axios'

const ADD_EVENT = 'events/addEvent'

export const createNewEvent = (event) => {
  const { title, summary, organizer, about, eventPic } = event

  const formData = new FormData();
  formData.append('title', title)
  formData.append('summary', summary)
  formData.append('organizer', organizer)
  if (about) {
    formData.append('about', about)
  }
  if (eventPic) {
    formData.append('eventPic', eventPic)
  }

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
