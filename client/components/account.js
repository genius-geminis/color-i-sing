import React from 'react'
import {connect} from 'react-redux'
import {getUserAccountThunk} from '../store/account'
import ImageHistory from './ImageHistory'

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.getUserAccountThunk()
  }
  render() {
    const {userAccount} = this.props
    return (
      <React.Fragment>
        <div>
          <span>Name : </span>
          {userAccount.name}
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
  userAccount: state.account.accountDetails,
  loading: state.account.loading
})

const mapDispatchToProps = dispatch => ({
  getUserAccountThunk: () => dispatch(getUserAccountThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
