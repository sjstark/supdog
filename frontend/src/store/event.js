import Axios from 'axios'

import { fetch } from './csrf'

const ADD_EVENTS = 'events/addEvents'
const SET_EVENTS = 'events/setEvents'
// const GET_N_EVENTS = 'events/getNEvents'
// const GET_ALL_EVENTS = 'events/getALLEvents'
const CLEAR_EVENTS = 'events/clearEvents'

//events is an array
const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events
})

//events is an array
const addEvents = (events) => ({
  type: ADD_EVENTS,
  payload: events
})

const clearEvents = () => ({
  type: CLEAR_EVENTS
})

// const getNEvents = (start = 0, amount = 10) => ({
//   type: GET_N_EVENTS,
//   payload: {
//     start,
//     amount
//   }
// })

// const getAllEvents = () => ({
//   type: GET_ALL_EVENTS,
// })

// export const getCurrentEvents = () => {
//   return dispatch => {
//     return dispatch(getAllEvents())
//   }
// }

export const loadMoreEvents = (start, amount) => {
  return async dispatch => {

    const res = await fetch(`/api/events?start=${start}&amount=${amount}`)

    return dispatch(addEvents(res.data.events))
  }
}

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

const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // case GET_N_EVENTS:
    //   return state.events.slice(payload.start, payload.start + payload.amount)

    // case GET_ALL_EVENTS:
    //   return state.events

    case SET_EVENTS:
      return [...payload]

    case ADD_EVENTS:
      return [...state, ...payload]

    case CLEAR_EVENTS:
      return []

    default:
      return state
  }
}
