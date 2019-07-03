import React from 'react'
import {makePath, getColor, getNext} from '../../util/functions'
import {Link} from 'react-router-dom'
import {addedImageUrl} from '../store'
import {connect} from 'react-redux'
import {test, heart, flower, star} from '../../util/templates'

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
      new Promise(function(resolve, reject) {
        setTimeout(function() {
          return resolve('success!')
        }, 1000)
      }).then(res => {
        this.rafId = requestAnimationFrame(this.paintNext)
      })
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
    let color = getColor(this.analyser, this.dataArray, this.props.palette)
    const ctx = this.canvas.current.getContext('2d')
    ctx.fillStyle = color
    let queue = [[this.state.x, this.state.y]]
    const inQ = {}
    while (queue.length) {
      const nextCoord = queue.shift()
      inQ[`${nextCoord[0]} ${nextCoord[1]}`] = true
      const neighbors = [
        [nextCoord[0] - 1, nextCoord[1] - 1],
        [nextCoord[0], nextCoord[1] - 1],
        [nextCoord[0] + 1, nextCoord[1] - 1],
        [nextCoord[0] - 1, nextCoord[1]],
        [nextCoord[0] + 1, nextCoord[1]],
        [nextCoord[0] - 1, nextCoord[1] + 1],
        [nextCoord[0], nextCoord[1] + 1],
        [nextCoord[0] + 1, nextCoord[1] + 1]
      ]
      neighbors.forEach(coord => {
        if (!inQ[`${coord[0]} ${coord[1]}`]) {
          if (
            coord[0] < 80 &&
            coord[0] >= 0 &&
            coord[1] < 80 &&
            coord[1] >= 0 &&
            star[coord[0]][coord[1]] === 0
          ) {
            inQ[`${coord[0]} ${coord[1]}`] = true
            queue.push(coord)
          }
        }
      })
    }
    Object.keys(inQ).forEach(coordStr => {
      let coordArr = coordStr.split(' ')
      let x = Number(coordArr[0]) * 5
      let y = Number(coordArr[1]) * 5
      ctx.fillRect(x, y, 5, 5)
    })
    const {newX, newY} = getNext(inQ)
    this.setState({x: newX, y: newY})
    this.rafId = requestAnimationFrame(this.paintNext)
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
            </>
          )}
        <canvas id="canvas" ref={this.canvas} width="400" height="400" />
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
