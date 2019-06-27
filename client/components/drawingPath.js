import React from 'react'
import Canvas from './canvas'

export class DrawingPath extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      intervalId: ''
    }
    this.makePath = this.makePath.bind(this)
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
  componentDidMount() {
    const newIntervalId = window.setInterval(() => {
      this.makePath()
    }, 50)
    this.setState({
      intervalId: newIntervalId
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  render() {
    console.log(this.state.x, this.state.y)
    return (
      <Canvas
        audio={this.props.audio}
        maxColor={this.props.maxColor}
        draw={ctx => {
          ctx.fillStyle = this.props.maxColor
          ctx.fillRect(this.state.x, this.state.y, 5, 5)
        }}
      />
    )
  }
}
