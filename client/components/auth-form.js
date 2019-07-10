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
    <div className="authform-outer-container">
      <div className="authform-inner-container">
        <form onSubmit={evt => handleSubmit(evt, hasImage)} name={name}>
          {name === 'signup' && (
            <>
              <label htmlFor="fullName">Full Name</label>
              <input name="fullName" type="text" />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input name="email" type="text" />

          <label htmlFor="password">Password</label>
          <input name="password" type="password" />

          <div className="center-items">
            <button type="submit" className="main-btn">
              {displayName}
            </button>
          </div>
          <div>
            <a href="/auth/google" className="form-signup__text center-items">
              <img className="google-img" src="/google.png" />
              {displayName} with Google!
            </a>
          </div>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {/* <a href="/auth/google">{displayName} with Google</a> */}
        <div className="center-items">
          <Link
            to={name === 'login' ? 'signup' : 'login'}
            className="form-signup__text"
          >
            {' '}
            {name === 'login'
              ? "Don't have an account? Sign Up!"
              : 'Already have an account? Log In!'}{' '}
          </Link>
        </div>
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
