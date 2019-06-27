import React from 'react'
import Canvas from './canvas'

export const Draw = props => {
  return (
    <Canvas
      draw={ctx => {
        ctx.beginPath()
        ctx.arc(95, 50, 40, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.stroke()
      }}
    />
  )
}
