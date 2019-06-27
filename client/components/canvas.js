import React from 'react'
import ReactDOM from 'react-dom'
import CanvasDraw from 'react-canvas-draw'

export default class Canvas extends React.Component {
  // state = {
  //   color: '#000000',
  //   brushRadius: 10,
  //   lazyRadius: 12,
  //   width: 800
  // }
  constructor() {
    super()
    this.canvas = React.createRef()
  }
  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d')
    this.props.draw(ctx)
  }

  render() {
    return <canvas ref={this.canvas} />
  }
}
