import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, fullName}) => (
  <nav>
    {
      <Link to="/">
        <img src="/logo.png" />
      </Link>
    }
    <div>
      <Link to="/draw-options">Color</Link>
      {isLoggedIn ? (
        <>
          <Link to="/account" className="nav-right">
            <i className="fa fa-fw fa-user" />
            {fullName}'s Account
          </Link>
          <Link href="#" onClick={handleClick} className="nav-right">
            <i className="fa fa-sign-out" /> Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup" className="nav-right">
            <i className="fa fa-user-plus" /> Sign Up
          </Link>
          <Link to="/login" className="nav-right">
            <i className="fa fa-sign-in" /> Login
          </Link>
        </>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.accountDetails.id,
    fullName: state.user.accountDetails.fullName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
