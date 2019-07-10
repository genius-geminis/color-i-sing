import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import ImageHistory from './ImageHistory'

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.me()
  }
  render() {
    const {userAccount} = this.props
    return (
      <div className="account-container">
        <div className="account-details">
          <div>
            <h2>Welcome, {userAccount.fullName}</h2>
          </div>
          <div>
            <h2>email: {userAccount.email}</h2>
          </div>
        </div>
        <ImageHistory />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userAccount: state.user.accountDetails
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
