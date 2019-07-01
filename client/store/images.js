import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_IIMAGE = 'ADD_IMAGE'

/**
 * INITIAL STATE
 */
const initialState = {
  images: [],
  image: {},
  loading: true
}

/**
 * ACTION CREATORS
 */
export const addedImage = image => ({type: ADD_IIMAGE, image})

//takes
export const addImageThunk = image => async dispatch => {
  try {
    const {data} = await axios.post('/api/images/', {image})
    dispatch(addedImage(data))
  } catch (error) {
    console.log('There was an error with addImageThunk:', error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_IIMAGE:
      return {
        images: [...state.images, action.image],
        loading: true
      }

    default:
      return state
  }
}
