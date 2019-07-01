import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_ACCOUNT = 'GET_ACCOUNT'

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ACCOUNT:
      return {accountDetails: action.userAccount, loading: false}
    default:
      return state
  }
}

export default reducer
