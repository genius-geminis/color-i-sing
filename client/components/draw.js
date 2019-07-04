import React from 'react'
import {makePath, getColor, getNext, clearTemplate} from '../../util/functions'
import {Link} from 'react-router-dom'
import {addedImageUrl} from '../store'
import {connect} from 'react-redux'
import {heart, flower, star} from '../../util/templates'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: null,
      x: 0,
      y: 0,
      imageUrl: '',
      isRecording: false,
      cleared: false,
      currentColor: 'rgb(255,255,255)'
    }
    this.canvas = React.createRef()
  }

  async componentDidMount() {
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
      this.setState({audio, cleared: false})
      this.rafId = requestAnimationFrame(this.showColor)
    }
  }

  getMic = async () => {
    this.setState({isRecording: true})
    await this.setWaiter(1000)
    this.paintNext()
  }

  stopMic = () => {
    if (this.state.audio) {
      this.state.audio.getTracks()[0].stop()
      this.setState({audio: null, isRecording: false})
      cancelAnimationFrame(this.rafId)
      this.getImage()
    }
  }

  setWaiter = timeout => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        return resolve('success!')
      }, timeout)
    })
  }

  showColor = () => {
    const color = getColor(this.analyser, this.dataArray, this.props.palette)
    this.setState({currentColor: color})
    this.rafId = requestAnimationFrame(this.showColor)
  }

  paintNext = async () => {
    const color = getColor(this.analyser, this.dataArray, this.props.palette)
    this.setState({currentColor: color})
    const ctx = this.canvas.current.getContext('2d')
    ctx.fillStyle = color
    const queue = [[this.state.y, this.state.x]]
    const inQ = {}
    let waitCounter = 0
    while (queue.length) {
      const nextCoord = queue.shift()
      inQ[`${nextCoord[0]} ${nextCoord[1]}`] = true
      const neighbors = [
        [nextCoord[0], nextCoord[1] - 1],
        [nextCoord[0] - 1, nextCoord[1]],
        [nextCoord[0] + 1, nextCoord[1]],
        [nextCoord[0], nextCoord[1] + 1]
      ]
      neighbors.forEach(coord => {
        if (!inQ[`${coord[0]} ${coord[1]}`]) {
          if (
            coord[0] < 80 &&
            coord[0] >= 0 &&
            coord[1] < 80 &&
            coord[1] >= 0 &&
            flower[coord[0]][coord[1]] === 0
          ) {
            inQ[`${coord[0]} ${coord[1]}`] = true
            queue.push(coord)
          }
        }
      })
      const x = Number(nextCoord[1]) * 5
      const y = Number(nextCoord[0]) * 5
      if (waitCounter === 10) {
        waitCounter = 0
        await this.setWaiter(1)
      } else {
        waitCounter++
      }
      ctx.fillRect(x, y, 5, 5)
    }

    const coords = getNext(inQ)
    if (coords === 'done') {
      this.stopMic()
    } else {
      this.setState({x: coords.newX, y: coords.newY})
      await this.setWaiter(1000)
      this.paintNext()
    }
  }

  getImage = () => {
    const canvas = document.getElementById('canvas')
    const imageUrl = canvas.toDataURL('image/png')
    this.setState({imageUrl})
    this.props.sendImageUrl(imageUrl)
  }

  clear = () => {
    const context = this.canvas.current.getContext('2d')
    context.clearRect(0, 0, 400, 400)
    clearTemplate()
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
      <>
        {this.state.isRecording ? (
          <button type="button" onClick={this.stopMic}>
            Stop
          </button>
        ) : (
          <button type="button" onClick={this.getMic}>
            Start
          </button>
        )}
        {!this.state.isRecording &&
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
            </>
          )}
        <canvas id="canvas" ref={this.canvas} width="400" height="400" />
        <div>
          <h1>This is your current color!</h1>
          <div
            style={{
              backgroundColor: this.state.currentColor,
              width: '100px',
              height: '100px',
              border: '1px solid gray'
            }}
          />
        </div>
      </>
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
