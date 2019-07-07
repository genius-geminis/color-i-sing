import React from 'react'
import {
  // makePath,
  getColor,
  clearTemplate,
  getNeighbors
} from '../../util/functions'
import * as palettes from '../../util/colors'
import {Link} from 'react-router-dom'
import {addedImageUrl, PostImageToShareThunk} from '../store'
import {connect} from 'react-redux'

const WHITE = 'rgb(255,255,255)'
const RED = 'rgb(255,0,0)'
const BLACK = 'rgb(0,0,0)'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      status: 'cleared',
      currentColor: WHITE
    }
    this.canvas = React.createRef()
    this.toRePaint = []
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
      this.paintOutline()
      this.rafId = requestAnimationFrame(this.showColor)
    }
  }

  startColoring = async () => {
    this.setState({status: 'recording'})
    const ctx = this.canvas.current.getContext('2d')
    const {toPaint, done, edges} = getNeighbors(this.props.template, 0)
    edges.forEach(coord => {
      ctx.fillStyle = RED
      const x = coord[1] * 1
      const y = coord[0] * 1
      ctx.fillRect(x, y, 1, 1)
    })
    await this.setWaiter(1000)
    this.paintNext(toPaint, done)
  }

  stopMic = () => {
    this.setState({status: 'stopped'})
    this.getImage()
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
    if (color !== this.state.currentColor) {
      this.setState({currentColor: color}, this.rePaint)
    }
    this.rafId = requestAnimationFrame(this.showColor)
  }

  paintOutline = () => {
    const toPaint = getNeighbors(this.props.template, 1)
    const ctx = this.canvas.current.getContext('2d')

    ctx.fillStyle = BLACK
    toPaint.forEach(([y, x]) => {
      ctx.fillRect(x, y, 1, 1)
    })
  }

  rePaint = () => {
    if (this.state.currentColor === WHITE) {
      return
    }
    const ctx = this.canvas.current.getContext('2d')

    ctx.fillStyle = this.state.currentColor
    this.toRePaint.forEach(([x, y]) => {
      ctx.fillRect(x, y, 1, 1)
    })
  }

  paintNext = async (toPaint, done) => {
    if (this.state.status === 'stopped') {
      return
    }
    const ctx = this.canvas.current.getContext('2d')
    let waitCounter = 0
    ctx.fillStyle = this.state.currentColor

    for (let i = 0; i < toPaint.length; i++) {
      const coord = toPaint[i]
      const x = coord[1] * 1
      const y = coord[0] * 1
      if (waitCounter > toPaint.length / 100) {
        waitCounter = 0
        await this.setWaiter(1)
      } else {
        waitCounter++
      }
      ctx.fillRect(x, y, 1, 1)
      this.toRePaint.push([x, y])
    }
    this.toRePaint = []
    if (done || this.state.status === 'stopped') {
      this.stopMic()
    } else {
      const {
        toPaint: nextToPaint,
        done: nextDone,
        edges: nextEdges
      } = getNeighbors(this.props.template, 0)
      nextEdges.forEach(coord => {
        ctx.fillStyle = RED
        const x = coord[1] * 1
        const y = coord[0] * 1
        ctx.fillRect(x, y, 1, 1)
      })
      await this.setWaiter(1000)
      this.paintNext(nextToPaint, nextDone)
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
    context.clearRect(0, 0, 300, 300)
    clearTemplate(this.props.template)
    this.paintOutline()
    this.setState({imageUrl: '', status: 'cleared'})
  }

  shareImageLink = () => {
    this.props.PostImageToShareThunk(this.state.imageUrl)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    if (this.analyser && this.source) {
      this.analyser.disconnect()
      this.source.disconnect()
    }
    this.clear()
  }

  render() {
    return (
      <>
        {this.state.status === 'recording' && (
          <button type="button" onClick={this.stopMic}>
            Stop
          </button>
        )}
        {this.state.status === 'cleared' && (
          <button type="button" onClick={this.startColoring}>
            Start
          </button>
        )}

        {this.state.status === 'stopped' && (
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
            <button type="button" onClick={this.shareImageLink}>
              Share Link
            </button>
            <p>{this.props.link}</p>
          </>
        )}
        <canvas id="canvas" ref={this.canvas} width="300" height="300" />
        <div>
          <h1>Your Color Palette (Low-High):</h1>
          <div>
            {palettes[this.props.palette].map(color => (
              <span
                key={color.toString()}
                style={{
                  backgroundColor: color,
                  width: '1px',
                  height: '100px',
                  display: 'inline-block'
                }}
              />
            ))}
            <div className="palette-labels">
              <p>low</p>
              <p>high</p>
            </div>
          </div>
          <h2>Current Color:</h2>
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
  brushMotion: state.drawOptions.brushMotion,
  link: state.imagesShare.link,
  template: state.drawOptions.template,
  templateInfo: state.drawOptions.templateInfo
})

const mapDispatchToProps = dispatch => ({
  sendImageUrl: image => dispatch(addedImageUrl(image)),
  PostImageToShareThunk: imageUrl => dispatch(PostImageToShareThunk(imageUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw)
