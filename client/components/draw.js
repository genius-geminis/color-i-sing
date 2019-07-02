import React from 'react'
import {makePath, getColor} from '../../util/functions'
import {Link} from 'react-router-dom'
import {addedImageUrl} from '../store'
import {connect} from 'react-redux'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: null,
      x: 0,
      y: 0,
      imageUrl: ''
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
      this.analyser.minDecibels = -80
      this.analyser.maxDecibels = -30
      this.analyser.fftSize = 8192
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
      this.source = this.audioContext.createMediaStreamSource(audio)
      this.source.connect(this.analyser)
      this.rafId = requestAnimationFrame(this.paintNext)
    }

    this.setState({audio})
  }

  stopMic = () => {
    if (this.state.audio) {
      this.state.audio.getTracks()[0].stop()
      this.setState({audio: null})
      cancelAnimationFrame(this.rafId)
      this.getImage()
    }
  }

  paintNext = () => {
    const color = getColor(this.analyser, this.dataArray, 'rainbow')
    const ctx = this.canvas.current.getContext('2d')
    ctx.fillStyle = color
    ctx.fillRect(this.state.x, this.state.y, 5, 5)
    this.rafId = requestAnimationFrame(this.paintNext)
    const {newX, newY} = makePath(this.state.x, this.state.y, 'linear')
    this.setState({x: newX, y: newY})
  }

  getImage = () => {
    const canvas = document.getElementById('canvas')
    const imageUrl = canvas.toDataURL('image/png')
    // console.log('are we hitting this?', imageUrl)
    this.setState({imageUrl})
    // console.log('are we hitting this?', this.props)
    this.props.sendImageUrl(imageUrl)
  }

  clear = () => {
    const context = this.canvas.current.getContext('2d')
    context.clearRect(0, 0, 500, 500)
    this.setState({imageUrl: '', x: 0, y: 0})
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    if (this.analyser && this.source) {
      this.analyser.disconnect()
      this.source.disconnect()
    }
  }

  render() {
    // console.log('this is props:', this.props)
    return (
      <React.Fragment>
        <button type="button" onClick={this.getMic}>
          Start
        </button>
        <button type="button" onClick={this.stopMic}>
          Stop
        </button>
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
        <canvas id="canvas" ref={this.canvas} width="500" height="500" />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  sendImageUrl: image => dispatch(addedImageUrl(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw)
