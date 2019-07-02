import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_IMAGE = 'DELETE_IMAGE'

/**
 * INITIAL STATE
 */
const defaultUser = {
  accountDetails: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const deletedImage = id => ({type: DELETE_IMAGE, id})

/**
 * THUNK CREATORS
 */

export const deleteImageThunk = id => async dispatch => {
  try {
    dispatch(deletedImage(id))
    await axios.delete(`/api/images?id=${id}`)
  } catch (error) {
    console.log('There was an error with deleteImagehunk:', error)
  }
}
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  hasImage,
  fullName
) => async dispatch => {
  let res
  try {
    if (fullName) {
      res = await axios.post(`/auth/${method}`, {email, password, fullName})
    } else {
      res = await axios.post(`/auth/${method}`, {email, password})
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    if (hasImage) {
      history.push('/upload')
    } else {
      history.push('/account')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, accountDetails: action.user}
    case REMOVE_USER:
      return defaultUser
    case DELETE_IMAGE:
      let newImages = state.accountDetails.images.filter(
        image => image.id !== action.id
      )
      return {
        ...state,
        accountDetails: {...state.accountDetails, images: newImages}
      }
    default:
      return state
  }
}
