import React from 'react'
import {colors} from '../../util/colors'
import {DrawingPath} from './drawingPath'

export class AudioAnalyser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maxColor: 'white'
    }
    this.getColor = this.getColor.bind(this)
  }

  // getting audio, analyzinf source
  componentDidMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.source = this.audioContext.createMediaStreamSource(this.props.audio)
    this.source.connect(this.analyser)
    this.rafId = requestAnimationFrame(this.getColor)
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

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect()
    this.source.disconnect()
  }

  render() {
    return (
      <DrawingPath maxColor={this.state.maxColor} audio={this.props.audio} />
    )
  }
}
