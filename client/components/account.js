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
      <React.Fragment>
        <div>
          <span>Name : </span>
          {userAccount.fullName}
        </div>
        <div>
          <span>Email : </span>
          {userAccount.email}
        </div>
        <ImageHistory />
      </React.Fragment>
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
