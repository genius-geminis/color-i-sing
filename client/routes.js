import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Draw,
  UserAccount,
  FormAddImage,
  drawOptions,
  HomePage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, hasPalette, hasTemplate} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/home" component={HomePage} />
        <Route path="/draw-options" component={drawOptions} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/draw"
          render={() =>
            hasPalette && hasTemplate ? (
              <Draw />
            ) : (
              <Redirect to="/draw-options" />
            )
          }
        />
        <Route path="/upload" component={FormAddImage} />
        <Route exact path="/home" render={() => <Redirect to="/" />} />
        <Route exact path="/" component={HomePage} />
        {isLoggedIn && <Route path="/account" component={UserAccount} />}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.accountDetails.id,
    hasPalette: !!state.drawOptions.palette,
    hasTemplate: !!state.drawOptions.template
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
