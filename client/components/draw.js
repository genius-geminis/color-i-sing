import React from 'react'
import ReactDom from 'react-dom'
import CanvasDraw from 'react-canvas-draw'

export default class Draw extends React.Component {
  // state = {
  //   color: '#000000',
  //   brushRadius: 10,
  //   lazyRadius: 12,
  //   width: 800
  // }

  render() {
    return (
      <div>
        <button>Start Mic</button>
        <button>Stop Mic</button>
        <button>Clear</button>
        <canvas id="canvas" />
        {/* <CanvasDraw style={{width: '80%'}}/> */}
        <button>Save</button>
      </div>
    )
  }
}
