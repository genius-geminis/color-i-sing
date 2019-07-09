import React from 'react'
import {
  // makePath,
  getColor,
  clearTemplate,
  getNeighbors,
  getOutline
} from '../../util/functions'
import * as palettes from '../../util/colors'
import {Link} from 'react-router-dom'
import {addedImageUrl, PostImageToShareThunk} from '../store'
import {connect} from 'react-redux'
import {Facebook, Twitter} from 'react-sharingbuttons'

const WHITE = 'rgb(255,255,255)'
const RED = 'rgb(255,0,0)'
const BLACK = 'rgb(0,0,0)'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      status: 'cleared',
      currentColor: WHITE,
      canvasWidth: null,
      canvasHeight: null
    }
    this.canvas = React.createRef()
    this.toRePaint = []
  }

  async componentDidMount() {
    this.templateImage = await IJS.Image.load(`/${this.props.template}.jpeg`)
    this.setState({
      canvasWidth: this.templateImage.width,
      canvasHeight: this.templateImage.height
    })

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
    const next = getNeighbors(this.templateImage)
    next.edges.forEach(coord => {
      ctx.fillStyle = RED
      const x = coord[1] * 1
      const y = coord[0] * 1
      ctx.fillRect(x, y, 1, 1)
    })
    await this.setWaiter(1000)
    this.paintNext(next.toPaint)
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

  paintOutline = async () => {
    const toPaint = await getOutline(this.templateImage)
    const ctx = this.canvas.current.getContext('2d')

    ctx.fillStyle = BLACK
    toPaint.forEach(coord => {
      const x = coord[1] * 1
      const y = coord[0] * 1
      ctx.fillRect(x, y, 1, 1)
    })
  }

  rePaint = () => {
    if (this.state.currentColor === WHITE) {
      return
    }
    const ctx = this.canvas.current.getContext('2d')

    ctx.fillStyle = this.state.currentColor
    this.toRePaint.forEach(coord => {
      const x = coord[0] * 1
      const y = coord[1] * 1
      ctx.fillRect(x, y, 1, 1)
    })
  }

  paintNext = async toPaint => {
    if (this.state.status === 'stopped') {
      return
    }
    if (!toPaint) {
      this.stopMic()
    }
    const ctx = this.canvas.current.getContext('2d')
    let waitCounter = 0
    ctx.fillStyle = this.state.currentColor

    for (let i = 0; i < toPaint.length; i++) {
      const coord = toPaint[i]
      const x = coord[1] * 1
      const y = coord[0] * 1
      if (waitCounter > toPaint.length / 150) {
        waitCounter = 0
        await this.setWaiter(1)
      } else {
        waitCounter++
      }
      ctx.fillRect(x, y, 1, 1)
      this.toRePaint.push([x, y])
    }
    this.toRePaint = []
    const next = getNeighbors(this.templateImage)
    if (!next) {
      this.stopMic()
    } else {
      next.edges.forEach(coord => {
        ctx.fillStyle = RED
        const x = coord[1] * 1
        const y = coord[0] * 1
        ctx.fillRect(x, y, 1, 1)
      })
      await this.setWaiter(1000)
      this.paintNext(next.toPaint)
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
    context.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight)
    clearTemplate()
    this.paintOutline()
    this.setState({imageUrl: '', status: 'cleared'})
  }

  shareImageLink = () => {
    this.props.PostImageToShareThunk(this.state.imageUrl)
  }

  createImageUrl = () => {
    //
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    if (this.analyser && this.source) {
      this.analyser.disconnect()
      this.source.disconnect()
    }
  }

  render() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${
      this.props.link
    }`
    const twitterUrl = `https://twitter.com/home?status=${this.props.link}`
    return (
      <div id="draw-page">
        <div id="draw-left">
          <div id="top-button">
            {this.state.status === 'recording' && (
              <button type="button" onClick={this.stopMic} id="stop-button">
                Stop
              </button>
            )}
            {this.state.status === 'cleared' && (
              <button
                type="button"
                onClick={this.startColoring}
                id="start-button"
              >
                Start
              </button>
            )}
            {this.state.status === 'stopped' && (
              <button type="button" onClick={this.clear} id="clear-button">
                Clear
              </button>
            )}
          </div>
          <div>
            <canvas
              id="canvas"
              ref={this.canvas}
              width={this.state.canvasWidth}
              height={this.state.canvasHeight}
            />
          </div>
          <div id="bottom-button">
            {this.state.status === 'stopped' && (
              <>
                <button type="button">
                  {this.props.isLoggedIn ? (
                    <Link to="upload" id="save-button">
                      Save
                    </Link>
                  ) : (
                    <Link to="signup">Log in or Sign up to Save</Link>
                  )}
                </button>
                <button type="button">
                  <a
                    href={this.state.imageUrl}
                    download="image"
                    id="download-button"
                  >
                    Download
                  </a>
                </button>

                <a href={facebookUrl}>
                  {' '}
                  <i className="fa fa-facebook-square" />
                </a>
                <a href={twitterUrl}>
                  {' '}
                  <i className="fa fa-twitter-square" />
                </a>

                <button
                  type="button"
                  onClick={this.shareImageLink}
                  id="share-button"
                >
                  Share Link
                </button>
                <p>{this.props.link}</p>
              </>
            )}
          </div>
        </div>
        <div id="color-palette">
          <h3>Your Color Palette (Low-High):</h3>
          <div id="palette-colors">
            {palettes[this.props.palette].map(color => (
              <div
                style={{
                  backgroundColor: color
                }}
              />
            ))}
          </div>
          <div className="palette-labels">
            <p>low</p>
            <p>high</p>
          </div>
        </div>
        <div id="current-color">
          <h3>Current Color:</h3>
          <div
            style={{
              backgroundColor: this.state.currentColor,
              width: '100px',
              height: '100px',
              border: '1px solid gray'
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.accountDetails.id,
  palette: state.drawOptions.palette,
  brushMotion: state.drawOptions.brushMotion,
  link: state.imagesShare.link,
  template: state.drawOptions.template
})

const mapDispatchToProps = dispatch => ({
  sendImageUrl: image => dispatch(addedImageUrl(image)),
  PostImageToShareThunk: imageUrl => dispatch(PostImageToShareThunk(imageUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw)
