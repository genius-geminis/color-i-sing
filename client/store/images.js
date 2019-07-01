import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_IMAGE = 'ADD_IMAGE'
const ADD_IMAGE_URL = 'ADD_IMAGE_URL'

/**
 * INITIAL STATE
 */
const initialState = {
  images: [],
  image: {},
  loading: true,
  imageUrl: ''
}

/**
 * ACTION CREATORS
 */
export const addedImage = image => ({type: ADD_IMAGE, image})
export const addedImageUrl = imageUrl => ({type: ADD_IMAGE_URL, imageUrl})

//thunk
export const addImageThunk = image => async dispatch => {
  try {
    const {data} = await axios.post('/api/images/', {image})
    dispatch(addedImage(data))
    console.log(data)
  } catch (error) {
    console.log('There was an error with addImageThunk:', error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.image],
        loading: true
      }
    case ADD_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.imageUrl
      }
    default:
      return state
  }
}
