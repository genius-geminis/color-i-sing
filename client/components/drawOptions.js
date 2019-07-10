import React from 'react'
import {getPaletteTemplate} from '../store'
import {connect} from 'react-redux'
import {ColorPalette} from './colorPalette'

const drawOptions = props => {
  return (
    <div className="draw-options-container">
      <form onSubmit={props.handleSubmit}>
        <div className="draw-options-inner__title">Select Template</div>
        <div className="draw-options-inner">
          <div>
            <label htmlFor="flower">
              <input
                type="radio"
                name="template"
                value="flower"
                id="flower"
                defaultChecked
              />
              <img className="input-img" src="/images/flower.jpeg" />
            </label>
            <div className="center-items"> Flower</div>
          </div>
          <div>
            <label htmlFor="star">
              <input type="radio" name="template" value="star" id="star" />

              <img className="input-img" src="/images/star.jpeg" />
            </label>
            <div className="center-items">Star</div>
          </div>
          <div>
            <label htmlFor="ice-cream">
              <input
                type="radio"
                name="template"
                value="ice-cream"
                id="ice-cream"
              />

              <img className="input-img" src="/images/ice-cream.jpeg" />
            </label>
            <div className="center-items">Ice Cream</div>
          </div>
          <div>
            <label htmlFor="butterfly">
              <input
                type="radio"
                name="template"
                value="butterfly"
                id="butterfly"
              />
              <img className="input-img" src="/images/butterfly.jpeg" />
            </label>
            <div className="center-items">Butterfly</div>
          </div>
          <div>
            <label htmlFor="balloon">
              <input
                type="radio"
                name="template"
                value="balloon"
                id="balloon"
              />
              <img className="input-img" src="/images/balloon.jpeg" />
            </label>
            <div className="center-items">Balloons</div>
          </div>
          <div>
            <label htmlFor="heart">
              <input type="radio" name="template" value="heart" id="heart" />
              <img className="input-img" src="/images/heart.jpeg" />
            </label>
            <div className="center-items"> Heart</div>
          </div>
        </div>

        <div className="draw-options-inner__title">Select Color Palette</div>

        <div className="draw-options-inner">
          <div className="darw-options-palette">
            <input
              type="radio"
              name="palette"
              value="rainbow"
              id="rainbow"
              className="input-img"
              defaultChecked
            />
            <label htmlFor="rainbow" className="input-img">
              <ColorPalette palette="rainbow" />
            </label>
            <div className="center-items negative-margin">Rainbow</div>
          </div>
          <div className="darw-options-palette">
            <input
              type="radio"
              name="palette"
              value="sunset"
              id="sunset"
              className="input-img"
            />
            <label htmlFor="sunset" className="input-img">
              <ColorPalette palette="sunset" />
            </label>
            <div className="center-items negative-margin">Sunset</div>
          </div>
          <div className="darw-options-palette">
            <input
              type="radio"
              name="palette"
              value="redBlue"
              id="redBlue"
              className="input-img"
            />
            <label htmlFor="redBlue" className="input-img">
              <ColorPalette palette="redBlue" />
            </label>
            <div className="center-items negative-margin"> Reb Blue</div>
          </div>
          <div className="darw-options-palette">
            <input
              type="radio"
              name="palette"
              value="mermaid"
              id="mermaid"
              className="input-img"
            />
            <label htmlFor="mermaid" className="input-img">
              <ColorPalette palette="mermaid" />
            </label>
            <div className="center-items negative-margin"> Mermaid</div>
          </div>
        </div>
        <div className="center-items">
          <button
            type="submit"
            className="start-btn"
            style={{marginBottom: '2rem'}}
          >
            Start
          </button>
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
  handleSubmit: event => {
    event.preventDefault()
    const palette = event.target.palette.value
    const template = event.target.template.value
    dispatch(getPaletteTemplate(palette, template))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(drawOptions)
