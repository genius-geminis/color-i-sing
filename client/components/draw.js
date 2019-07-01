import React from 'react'
import {colors} from '../../util/colors'
import {Link} from 'react-router-dom'
import {addedImageUrl} from '../store'
import {connect} from 'react-redux'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: null,
      maxColor: 'white',
      x: 0,
      y: 0,
      imageUrl: ''
    }
    this.WIDTH = 500
    this.HEIGHT = 500
    this.pixWidth = this.WIDTH / 100
    this.pixHeight = this.HEIGHT / 100
    this.canvas = React.createRef()
    this.getMic = this.getMic.bind(this)
    this.paintNext = this.paintNext.bind(this)
    this.stopMic = this.stopMic.bind(this)
    this.getColor = this.getColor.bind(this)
    this.makePath = this.makePath.bind(this)
    this.clear = this.clear.bind(this)
    this.getImage = this.getImage.bind(this)
  }

  async getMic() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)

    if (audio) {
      this.source = this.audioContext.createMediaStreamSource(audio)
      this.source.connect(this.analyser)
      this.rafId = requestAnimationFrame(this.paintNext)
    }

    this.setState({audio})
  }

  stopMic() {
    this.state.audio.getTracks()[0].stop()
    this.setState({audio: null})
    cancelAnimationFrame(this.rafId)
    this.getImage()
  }

  paintNext() {
    this.getColor()
    const ctx = this.canvas.current.getContext('2d')
    ctx.fillStyle = this.state.maxColor
    ctx.fillRect(this.state.x, this.state.y, 5, 5)
    ctx.save()
    this.rafId = requestAnimationFrame(this.paintNext)
    this.makePath()
  }

  getColor() {
    this.analyser.getByteFrequencyData(this.dataArray)
    const newArray = this.dataArray.slice(0, 60)
    let max = 0
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] > newArray[max]) {
        max = i
      }
    }
    const maxColor = colors[max]
    this.setState({maxColor})
  }

  makePath() {
    let newX = this.state.x + this.pixWidth
    let newY = this.state.y
    if (newX > this.WIDTH) {
      newY = this.state.y + this.pixHeight
      newX = 0
    }
    this.setState({x: newX, y: newY})
  }

  getImage() {
    const canvas = document.getElementById('canvas')
    const imageUrl = canvas.toDataURL('image/png')
    // console.log('are we hitting this?', imageUrl)
    this.setState({imageUrl})
    console.log('are we hitting this?', this.props)
    this.props.sendImageUrl(imageUrl)
  }

  clear() {
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
