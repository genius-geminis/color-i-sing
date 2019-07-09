import React from 'react'
import {choosePalette, chooseTemplate} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ColorPalette} from './colorPalette'

const drawOptions = props => {
  return (
    <div id="options-page">
      <form className="options-form">
        <div id="options-container">
          <div>
            <h2>Select Color Palette</h2>
            <div className="input-options">
              <label htmlFor="rainbow">
                <input
                  type="radio"
                  name="palette"
                  value="rainbow"
                  id="rainbow"
                  className="draw-input"
                />
                Rainbow
                <ColorPalette palette="rainbow" />
              </label>
              <label htmlFor="sunset">
                <input
                  type="radio"
                  name="palette"
                  value="sunset"
                  id="sunset"
                  className="draw-input"
                />
                Sunset
                <ColorPalette palette="sunset" />
              </label>
              <label htmlFor="redBlue">
                <input
                  type="radio"
                  name="palette"
                  value="redBlue"
                  id="redBlue"
                  className="draw-input"
                />
                Red to Blue
                <ColorPalette palette="redBlue" />
              </label>
            </div>
          </div>
          <div>
            <h2>Select Template</h2>
            <div className="input-options">
              <label htmlFor="flower">
                <input
                  type="radio"
                  name="template"
                  value="flower"
                  id="flower"
                  className="draw-input"
                />
                Flower
                <img className="input-img" src="/images/flower.jpeg" />
              </label>
              <label htmlFor="star">
                <input
                  type="radio"
                  name="template"
                  value="star"
                  id="star"
                  className="draw-input"
                />
                Star
                <img className="input-img" src="/images/star.jpeg" />
              </label>
              <label htmlFor="ice-cream">
                <input
                  type="radio"
                  name="template"
                  value="ice-cream"
                  id="ice-cream"
                  className="draw-input"
                />
                Ice Cream
                <img className="input-img" src="/images/ice-cream.jpeg" />
              </label>
              <label htmlFor="butterfly">
                <input
                  type="radio"
                  name="template"
                  value="butterfly"
                  id="butterfly"
                  className="draw-input"
                />
                Butterfly
                <img className="input-img" src="/images/butterfly.jpeg" />
              </label>
              <label htmlFor="balloon">
                <input
                  type="radio"
                  name="template"
                  value="balloon"
                  id="balloon"
                  className="draw-input"
                />
                Balloons
                <img className="input-img" src="/images/balloon.jpeg" />
              </label>
              <label htmlFor="heart">
                <input
                  type="radio"
                  name="template"
                  value="heart"
                  id="heart"
                  className="draw-input"
                />
                Heart
                <img className="input-img" src="/images/heart.jpeg" />
              </label>
            </div>
          </div>
        </div>

        <div>
          <Link to="draw" className="button">
            Start Drawing
          </Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  palette: state.drawOptions.palette,
  template: state.drawOptions.template
})

const mapDispatchToProps = dispatch => ({
  choosePalette: event => {
    const palette = event.target.value
    dispatch(choosePalette(palette))
  },
  chooseTemplate: event => {
    const template = event.target.value
    dispatch(chooseTemplate(template))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(drawOptions)
