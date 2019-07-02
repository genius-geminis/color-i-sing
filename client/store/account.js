import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_ACCOUNT = 'GET_ACCOUNT'
const DELETE_IMAGE = 'DELETE_IMAGE'

/**
 * INITIAL STATE
 */
const initialState = {
  accountDetails: {},
  loading: true
}

/**
 * ACTION CREATORS
 */
const gotUserAccount = userAccount => ({type: GET_USER_ACCOUNT, userAccount})
const deletedImage = id => ({type: DELETE_IMAGE, id})

/**
 * THUNK CREATORS
 */
export const getUserAccountThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/account')
    dispatch(gotUserAccount(data))
  } catch (error) {
    console.log('There was an error with getUserAccountThunk:', error)
  }
}

export const deleteImageThunk = id => async dispatch => {
  try {
    dispatch(deletedImage(id))
    await axios.delete(`/api/images?id=${id}`)
  } catch (error) {
    console.log('There was an error with deleteImagehunk:', error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ACCOUNT:
      return {accountDetails: action.userAccount}

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

export default reducer
