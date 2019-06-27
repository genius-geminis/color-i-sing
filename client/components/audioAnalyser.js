import React from 'react'

export class AudioAnalyser extends React.Component {
  constructor(props) {
    super()
  }

  // getting audio, analyzinf source
  componentDidMount() {
    this.audioContext = new (window.audioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.source = this.audioContext.createMediaStreamSource(this.props.audio)
    this.source.connect(this.analyser)
  }

  render() {}
}
