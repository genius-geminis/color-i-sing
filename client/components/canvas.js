import React from 'react'

export default class Canvas extends React.Component {
  constructor() {
    super()
    this.canvas = React.createRef()
  }
  componentDidUpdate() {
    if (this.props.audio !== null) {
      const ctx = this.canvas.current.getContext('2d')
      this.props.draw(ctx)
    }
  }

  render() {
    return <canvas ref={this.canvas} width="500" height="500" />
  }
}
