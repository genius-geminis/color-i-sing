import React from 'react'
import {AudioAnalyser} from './audioAnalyser'

export class Draw extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null
    }
    this.getMic = this.getMic.bind(this)
    this.stopMic = this.stopMic.bind(this)
  }

  async getMic() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true
      // video: false
    })
    this.setState({audio})
  }

  stopMic() {
    this.state.audio.getTracks()[0].stop()
    this.setState({audio: null})
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" onClick={this.getMic}>
          Start
        </button>
        <button type="button" onClick={this.stopMic}>
          Stop
        </button>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </React.Fragment>
    )
  }
}
