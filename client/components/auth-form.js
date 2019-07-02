import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, hasImage} = props

  return (
    <div>
      <form onSubmit={evt => handleSubmit(evt, hasImage)} name={name}>
        {name === 'signup' && (
          <div>
            <label htmlFor="fullName">
              <small>Full Name</small>
            </label>
            <input name="fullName" type="text" />
          </div>
        )}

        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
      <div>
        <Link to={name === 'login' ? 'signup' : 'login'}>
          {' '}
          {name === 'login'
            ? "Don't have an account? Sign Up!"
            : 'Already have an account? Log In!'}{' '}
        </Link>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.accountDetails.error,
    hasImage: !!state.images.imageUrl
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.accountDetails.error,
    hasImage: !!state.images.imageUrl
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, hasImage) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const fullName = formName === 'signup' ? evt.target.fullName.value : ''
      dispatch(auth(email, password, formName, hasImage, fullName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
