import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_IMAGE = 'ADD_IMAGE'
const ADD_IMAGE_URL = 'ADD_IMAGE_URL'
const ADD_IMAGE_NAME = 'ADD_IMAGE_NAME'

/**
 * INITIAL STATE
 */
const initialState = {
  images: [],
  name: '',
  loading: true,
  imageUrl: ''
}

/**
 * ACTION CREATORS
 */
export const addedImage = image => ({type: ADD_IMAGE, image})
export const addedImageUrl = imageUrl => ({type: ADD_IMAGE_URL, imageUrl})
const addedImageName = name => ({type: ADD_IMAGE_NAME, name})

//thunk
export const addImageThunk = image => async dispatch => {
  try {
    const {imageUrl, name, userId} = image
    const {data} = await axios.post('/api/images/', {imageUrl, name, userId})
    if (data === 'Please log in!') {
      dispatch(addedImageName(name))
      history.push('/signup')
    } else {
      dispatch(addedImage(data))
      history.push('/account')
    }
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
    case ADD_IMAGE_NAME:
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}
