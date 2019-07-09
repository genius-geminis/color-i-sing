import React from 'react'
import CountdownTimer from './CountDown'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: false})
    }, 5000)
  }

  showHideClassName = () => {
    return this.state.show ? 'modal display-block' : 'modal display-none'
  }

  render() {
    return (
      <div className={this.showHideClassName()}>
        <CountdownTimer />
      </div>
    )
  }
}
