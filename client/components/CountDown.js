import React from 'react'

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemainingInSeconds: 5,
      startTimeInSeconds: 5
    }
  }
  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      })
    } else {
      clearInterval(!this.timer)
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining()
    }, 1000)
  }

  render() {
    return (
      <div className="modal-main">
        <div className="countdown-timer__circle">
          <svg>
            <circle
              r="69.85699"
              cy="81"
              cx="81"
              style={{
                animation: `countdown-animation ${
                  this.state.startTimeInSeconds
                }s linear`
              }}
            />
          </svg>
        </div>
        <div className="countdown-timer__text">
          {this.state.timeRemainingInSeconds}
        </div>
      </div>
    )
  }
}
