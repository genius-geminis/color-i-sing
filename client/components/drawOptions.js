import React from 'react'
import {choosePalette, chooseBrushMotion, chooseTemplate} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const drawOptions = props => {
  return (
    <div id="options-page">
      <div id="options-container">
        <label>Select Color Palette</label>
        <div className="select space-bottom">
          <select onChange={props.choosePalette}>
            <option>--</option>
            <option value="rainbow">Rainbow</option>
            <option value="sunset">Sunset</option>
            <option value="redBlue">Red to Blue</option>
          </select>
        </div>

        <label>Select Brush Motion</label>
        <div className="select space-bottom">
          <select onChange={props.chooseBrushMotion}>
            <option>--</option>
            <option value="horizontal">Linear Horizontal</option>
            <option value="random">Random</option>
            <option value="vertical">Linear Vertical</option>
          </select>
        </div>

        <label>Select Template</label>
        <div className="select">
          <select onChange={props.chooseTemplate}>
            <option>--</option>
            <option value="flower">Flower</option>
            <option value="star">Star</option>
            <option value="heart">Heart</option>
          </select>
        </div>
      </div>
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
  brushMotion: state.drawOptions.brushMotion,
  template: state.drawOptions.template
})

const mapDispatchToProps = dispatch => ({
  choosePalette: event => {
    const palette = event.target.value
    dispatch(choosePalette(palette))
  },

  chooseBrushMotion: event => {
    const brushMotion = event.target.value
    dispatch(chooseBrushMotion(brushMotion))
  },
  chooseTemplate: event => {
    const template = event.target.value
    dispatch(chooseTemplate(template))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(drawOptions)
