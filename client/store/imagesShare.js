import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_IMAGE_TOSHARE = 'GET_IMAGE_TOSHARE'
const ADD_IMAGE_TOSHARE = 'ADD_IMAGE_TOSHARE'

/**
 * INITIAL STATE
 */
const initialState = {
  link: ''
}

/**
 * ACTION CREATORS
 */
export const addedImageToShare = url => ({type: ADD_IMAGE_TOSHARE, url})
export const gotImageToShare = imageUrl => ({type: GET_IMAGE_TOSHARE, imageUrl})

/**
 * THUNK CREATORS
 */
export const PostImageToShareThunk = imageUrl => async dispatch => {
  try {
    const {data} = await axios.post('/api/imageShare', {imageUrl})
    let url = `http://colorising.herokuapp.com/api/imageShare/${data}`
    dispatch(addedImageToShare(url))
  } catch (error) {
    console.log('There was an error with ImageToShareThunk:', error)
  }
}
export const GetImageToShareThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/imageShare/${id}`)
    dispatch(gotImageToShare(data))
  } catch (error) {
    console.log('There was an error with ImageToShareThunk:', error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_IMAGE_TOSHARE:
      return {...state, link: action.url}
    case GET_IMAGE_TOSHARE:
      return {...state, link: action.imageUrl}
    default:
      return state
  }
}
