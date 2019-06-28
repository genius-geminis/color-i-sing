import React from 'react'
// import {AudioAnalyser} from './audioAnalyser'
// import Canvas from './canvas'
import {colors} from '../../util/colors'

export class Draw extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      maxColor: 'white',
      x: 0,
      y: 0,
      intervalId: '',
      dataUrl: ''
    }
    this.canvas = React.createRef()
    this.getMic = this.getMic.bind(this)
    this.gotMic = this.gotMic.bind(this)
    this.stopMic = this.stopMic.bind(this)
    this.getColor = this.getColor.bind(this)
    this.makePath = this.makePath.bind(this)
    this.clear = this.clear.bind(this)
    this.downloadImage = this.downloadImage.bind(this)
  }

  componentDidMount() {
    const newIntervalId = window.setInterval(() => {
      this.makePath()
    }, 50)
    this.setState({
      intervalId: newIntervalId
    })
  }

  async getMic() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true
      // video: false
    })
    this.setState({audio})
    this.gotMic()
  }

  gotMic() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)

    if (this.state.audio !== null) {
      this.source = this.audioContext.createMediaStreamSource(this.state.audio)
      this.source.connect(this.analyser)
      this.rafId = requestAnimationFrame(this.getColor)
    }
  }

  stopMic() {
    this.state.audio.getTracks()[0].stop()
    this.setState({audio: null})
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
    this.rafId = requestAnimationFrame(this.getColor)
  }

  makePath() {
    const WIDTH = 500
    const HEIGHT = 500
    const pixWidth = WIDTH / 100
    const pixHeight = HEIGHT / 100
    let newX = this.state.x + pixWidth
    let newY = this.state.y
    if (newX > WIDTH) {
      newY = this.state.y + pixHeight
      newX = 0
    }
    this.setState({x: newX, y: newY})
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect()
    this.source.disconnect()
    clearInterval(this.state.intervalId)
  }

  componentDidUpdate() {
    if (this.state.audio !== null) {
      const ctx = this.canvas.current.getContext('2d')
      ctx.fillStyle = this.state.maxColor
      ctx.fillRect(this.state.x, this.state.y, 5, 5)
      ctx.save()
    }
  }

  downloadImage() {
    const canvas = document.getElementById('canvas')
    const dataUrl = canvas.toDataURL('image/png')
    this.setState({dataUrl})
  }

  clear() {
    const context = this.canvas.current.getContext('2d')
    context.clearRect(0, 0, 500, 500)
    this.setState({dataUrl: '', x: 0, y: 0})
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
        <button type="button" onClick={this.downloadImage}>
          Save
        </button>
        <button type="button">
          <a href={this.state.dataUrl} download="image">
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
