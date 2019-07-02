import React from 'react'
import {choosePalette, chooseBrushMotion} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const drawOptions = props => {
  return (
    <div>
      <label>Select Color Palette</label>
      <select onChange={props.choosePalette}>
        <option>--</option>
        <option value="rainbow">Rainbow</option>
        <option value="sunset">Sunset</option>
      </select>

      <label>Select Brush Motion</label>
      <select onChange={props.chooseBrushMotion}>
        <option>--</option>
        <option value="linear">Linear</option>
        <option value="random">Random</option>
      </select>
      <div>
        <button type="button">
          <Link to="draw">Start Drawing</Link>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  palette: state.drawOptions.palette,
  brushMotion: state.drawOptions.brushMotion
})

const mapDispatchToProps = dispatch => ({
  choosePalette: event => {
    const palette = event.target.value
    dispatch(choosePalette(palette))
  },

  chooseBrushMotion: event => {
    const brushMotion = event.target.value
    dispatch(chooseBrushMotion(brushMotion))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(drawOptions)
