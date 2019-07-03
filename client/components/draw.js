import React from 'react'
import {makePath, getColor} from '../../util/functions'
import {Link} from 'react-router-dom'
import {addedImageUrl} from '../store'
import {connect} from 'react-redux'
import {Facebook, Twitter} from 'react-sharingbuttons'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: null,
      x: 0,
      y: 0,
      imageUrl: '',
      micStopped: false,
      cleared: false
    }
    this.canvas = React.createRef()
  }

  getMic = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true
    })

    if (audio) {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.minDecibels = -70
      this.analyser.maxDecibels = -30
      this.analyser.fftSize = 8192
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
      this.source = this.audioContext.createMediaStreamSource(audio)
      this.source.connect(this.analyser)
      this.rafId = requestAnimationFrame(this.paintNext)
    }

    this.setState({audio, micStopped: false, cleared: false})
  }

  stopMic = () => {
    if (this.state.audio) {
      this.state.audio.getTracks()[0].stop()
      this.setState({audio: null, micStopped: true})
      cancelAnimationFrame(this.rafId)
      this.getImage()
    }
  }

  paintNext = () => {
    const color = getColor(this.analyser, this.dataArray, this.props.palette)
    const ctx = this.canvas.current.getContext('2d')
    ctx.fillStyle = color
    // for(let i = 0; i <= color.max; i++){

    // }
    ctx.fillRect(this.state.x, this.state.y, 5, 5)
    this.rafId = requestAnimationFrame(this.paintNext)
    const {newX, newY} = makePath(
      this.state.x,
      this.state.y,
      this.props.brushMotion
    )
    this.setState({x: newX, y: newY})
  }

  getImage = () => {
    const canvas = document.getElementById('canvas')
    const imageUrl = canvas.toDataURL('image/png')

    this.setState({imageUrl})
    this.props.sendImageUrl(imageUrl)
  }

  clear = () => {
    const context = this.canvas.current.getContext('2d')
    context.clearRect(0, 0, 500, 500)
    this.setState({imageUrl: '', x: 0, y: 0, cleared: true})
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    if (this.analyser && this.source) {
      this.analyser.disconnect()
      this.source.disconnect()
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.audio ? (
          <button type="button" onClick={this.stopMic}>
            Stop
          </button>
        ) : (
          <button type="button" onClick={this.getMic}>
            Start
          </button>
        )}
        {this.state.micStopped &&
          !this.state.cleared && (
            <>
              <button type="button">
                {this.props.isLoggedIn ? (
                  <Link to="upload">Save</Link>
                ) : (
                  <Link to="signup">Log in or Sign up to Save</Link>
                )}
              </button>
              <button type="button">
                <a href={this.state.imageUrl} download="image">
                  Download
                </a>
              </button>
              <button type="button" onClick={this.clear}>
                Clear
              </button>
              <div>
                <Facebook url={encodeURIComponent(this.state.imageUrl)} />
                <Twitter url={this.state.imageUrl} shareText="Check this!" />
              </div>
            </>
          )}
        <canvas id="canvas" ref={this.canvas} width="500" height="500" />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.accountDetails.id,
  palette: state.drawOptions.palette,
  brushMotion: state.drawOptions.brushMotion
})

const mapDispatchToProps = dispatch => ({
  sendImageUrl: image => dispatch(addedImageUrl(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw)
