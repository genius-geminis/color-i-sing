import React from 'react'

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemainingInSeconds: 3,
      startTimeInSeconds: 5
    }
    this.messages = ['sing', '1', '2', '3']
  }
  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState(({timeRemainingInSeconds}) => {
        return {
          timeRemainingInSeconds: timeRemainingInSeconds - 1
        }
      })
    } else {
      clearInterval(!this.timer)
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining()
    }, 1250)
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
        <div
          className={`countdown-timer__text ${
            this.messages[this.state.timeRemainingInSeconds]
          }`}
        >
          {this.messages[this.state.timeRemainingInSeconds]}
        </div>
      </div>
    )
  }
}
