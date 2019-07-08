import React from 'react'

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemainingInSeconds: 0,
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
      <div className="countdown-timer">
        <div className="countdown-timer__circle">
          <svg>
            <circle
              r="24"
              cx="26"
              cy="26"
              style={{
                animation: `countdown-animation ${
                  this.props.startTimeInSeconds
                }s linear`
              }}
            />
          </svg>
        </div>
        <div className="countdown-timer__text">
          {this.state.timeRemainingInSeconds}s
        </div>
      </div>
    )
  }
}
