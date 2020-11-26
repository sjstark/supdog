const SET_VIEW = 'view/setView'
const CLEAR_VIEW = 'view/clearView'

const _setView = (view) => ({
  type: SET_VIEW,
  payload: view
})

const _clearView = () => ({
  type: CLEAR_VIEW
})

export const changeView = (newView) => {
  return dispatch => {
    return dispatch(_setView(newView))
  }
}

export const clearView = () => {
  return dispatch => {
    return dispatch(_clearView())
  }
}

export default (state = null, { type, payload }) => {
  switch (type) {

    case SET_VIEW:
      return payload

    case CLEAR_VIEW:
      return null

    default:
      return state
  }
}
