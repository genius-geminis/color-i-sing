import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, fullName}) => (
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    {/* <div id="title-container">
    { <Link to="/home" id="title">
        Color I Sing
      </Link> }
    </div> */}
    <nav id="navigation-bar">
      <div>
        <Link to="/home">Home</Link>
        <Link to="/draw">Draw</Link>
        {isLoggedIn ? (
          <>
            <Link href="#" onClick={handleClick} className="nav-right">
              <i className="fa fa-sign-out" /> Logout
            </Link>
            <Link to="/account" className="nav-right">
              <i className="fa fa-fw fa-user" />
              {fullName}'s Account
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
  </div>
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
