import React from 'react'
import * as palettes from '../../util/colors'

export const ColorPalette = props => {
  return (
    <>
      <div id="palette-colors">
        {palettes[props.palette].map(color => (
          <div
            style={{
              backgroundColor: color
            }}
          />
        ))}
      </div>
      <div className="palette-labels">
        <p>low</p>
        <p>high</p>
      </div>
    </>
  )
}
