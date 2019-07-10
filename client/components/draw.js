/* eslint-disable complexity */
import React from 'react'
import {
  getColor,
  clearTemplate,
  getNeighbors,
  getOutline
} from '../../util/functions'
import {Link} from 'react-router-dom'
import {addedImageUrl, PostImageToShareThunk} from '../store'
import {connect} from 'react-redux'
import Modal from './Modal'
import ShareModal from './shareModal'
import {ColorPalette} from './colorPalette'
import Confetti from 'react-confetti'

const WHITE = '#FAEDE5'
const RED = '#fd4f57'
const BLACK = 'rgb(0,0,0)'

class Draw extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      status: '',
      canvasWidth: null,
      canvasHeight: null,
      showCountdownModal: true,
      showSocialModal: false,
      showConfetti: false
    }
    this.canvas = React.createRef()
    this.toRePaint = []
    this.mostCommonColor = WHITE
    this.recentColors = [WHITE]
    this.currentColor = React.createRef()
  }

  async componentDidMount() {
    this.templateImage = await IJS.Image.load(
      `/images/${this.props.template}.jpeg`
    )
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

    this.startWithCountdown()
  }

  startWithCountdown = () => {
    this.setState({status: 'recording'})
    setTimeout(() => {
      this.setState({showCountdownModal: false})
      this.startColoring()
    }, 5000)
  }

  startColoring = async () => {
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

  stop = () => {
    this.setState({status: 'stopped', showConfetti: true})
    this.getImage()
    setTimeout(() => {
      this.setState({showConfetti: false})
    }, 5000)
  }

  setWaiter = timeout => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        return resolve('success!')
      }, timeout)
    })
  }

  setMode = () => {
    const colorOccurences = this.recentColors.reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++
      } else {
        acc[curr] = 1
      }
      return acc
    }, {})
    const [mode] = Object.entries(colorOccurences).reduce(
      ([accKey, accVal], [key, val]) => {
        if (val > accVal) {
          return [key, val]
        }
        return [accKey, accVal]
      }
    )
    const lastMostCommonColor = this.mostCommonColor
    this.mostCommonColor = mode
    return lastMostCommonColor !== this.mostCommonColor
  }

  showColor = () => {
    const color = getColor(this.analyser, this.dataArray, this.props.palette)
    const colorChanged = this.setMode()
    this.recentColors =
      this.recentColors.length < 20
        ? [...this.recentColors, color]
        : [...this.recentColors.slice(1), color]
    if (colorChanged) {
      this.currentColor.current.style.backgroundColor = this.mostCommonColor
      this.rePaint()
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
    if (this.mostCommonColor === WHITE) {
      return
    }
    const ctx = this.canvas.current.getContext('2d')
    ctx.fillStyle = this.mostCommonColor
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
      this.stop()
    }
    const ctx = this.canvas.current.getContext('2d')
    let waitCounter = 0
    ctx.fillStyle = this.mostCommonColor

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
      this.stop()
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
    this.setState({showSocialModal: true})
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
      <div className="draw-page-container">
        <div id="draw-left">
          <div className="draw-options-inner__title">Your Canvas: </div>
          <canvas
            id="canvas"
            ref={this.canvas}
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
          />
        </div>
        <div className="right-side-draw">
          <h3 className="current-color-title">Current Color: </h3>
          <div className="top-right-draw">
            {this.state.showCountdownModal && <Modal />}
            {this.state.status === 'recording' && (
              <button type="button" onClick={this.stop} className="stop-btn">
                Stop
              </button>
            )}
            {this.state.status === 'cleared' && (
              <button
                type="button"
                onClick={() => {
                  this.setState({showCountdownModal: true})
                  this.startWithCountdown()
                }}
                className="start-btn"
              >
                Start
              </button>
            )}
            {this.state.status === 'stopped' && (
              <button type="button" onClick={this.clear} className="clear-btn">
                Clear
              </button>
            )}
            <div id="current-color" ref={this.currentColor} />
          </div>
          {this.state.showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={800}
            />
          )}
          <div className="bottom-button">
            {this.state.status === 'stopped' && (
              <>
                {this.props.isLoggedIn ? (
                  <Link to="upload">
                    <button className="save-btn" type="button">
                      Save
                    </button>
                  </Link>
                ) : (
                  <Link to="signup">
                    <button className="save-btn" type="button">
                      Save
                    </button>
                  </Link>
                )}
                {this.state.showSocialModal && <ShareModal />}
                <button
                  type="button"
                  onClick={this.shareImageLink}
                  className="share-btn"
                >
                  Share
                </button>
                <a
                  href={this.state.imageUrl}
                  download="image"
                  className="download"
                >
                  Download
                </a>
              </>
            )}
          </div>
          <div id="color-palette">
            <h3>Your Color Palette:</h3>
            <ColorPalette palette={this.props.palette} />
          </div>
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
