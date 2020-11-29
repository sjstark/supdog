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

const _clearEvents = () => ({
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

export const clearEvents = () => {
  return dispatch => {
    return dispatch(_clearEvents())
  }
}

export const loadMoreEvents = (start, amount, view) => {
  return async dispatch => {

    let res;
    if (view && view.startsWith('CATEGORY:')) {
      let categoryId = view.slice(9)
      res = await fetch(`/api/categories/${categoryId}?start=${start}&amoount=${amount}`)
    }
    else if (view && view.startsWith('SEARCH:')) {
      let searchQuery = encodeURI(view.slice(7))
      res = await fetch(`/api/events/search?start=${start}&amount=${amount}&search=${searchQuery}`)
    }
    else if (view && view === 'MY-EVENTS' ) {
      res = await fetch(`/api/events/my-events`)
    }
    else {
      res = await fetch(`/api/events?start=${start}&amount=${amount}`)
    }

    let { events } = res.data
    if (events && events.length >= 1) return dispatch(addEvents(events))
  }
}

export const loadInitialEvents = (view) => {
  return async dispatch => {
    await dispatch(clearEvents())
    return await dispatch(loadMoreEvents(0, 10, view))
  }
}

export const createNewEvent = (event) => {
  const { title, summary, categoryId, organizer, about, eventPic, tickets, dates } = event

  const formData = new FormData();
  formData.append('title', title)
  formData.append('summary', summary)
  formData.append('organizer', organizer)
  formData.append('categoryId', categoryId)
  formData.append('tickets', tickets)
  formData.append('eventDates', dates)
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

export const updateEvent = (eventId, newEvent) => {
  const { title, summary, categoryId, organizer, about, eventPic, tickets, dates } = newEvent

  const formData = new FormData();
  formData.append('eventId', eventId)
  formData.append('title', title)
  formData.append('summary', summary)
  formData.append('organizer', organizer)
  formData.append('categoryId', categoryId)
  formData.append('tickets', tickets)
  formData.append('eventDates', dates)
  if (about) {
    formData.append('about', about)
  }
  if (eventPic) {
    formData.append('eventPic', eventPic)
  }

  const config = {
    method: 'PUT',
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return Axios.put('/api/events/', formData, config)
    .catch((err) => {
      return err.response
    })
}

const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {

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
