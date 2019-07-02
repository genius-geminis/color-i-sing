import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SELECT_PALETTE = 'SELECT_PALETTE'
const SELECT_BRUSH_MOTION = 'SELECT_BRUSH_MOTION'

/**
 * INITIAL STATE
 */
const initialState = {
  palette: '',
  brushMotion: ''
}

/**
 * ACTION CREATORS
 */
export const choosePalette = palette => ({
  type: SELECT_PALETTE,
  palette
})

export const chooseBrushMotion = brushMotion => ({
  type: SELECT_BRUSH_MOTION,
  brushMotion
})

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_PALETTE:
      return {
        ...state,
        palette: action.palette
      }
    case SELECT_BRUSH_MOTION:
      return {
        ...state,
        brushMotion: action.brushMotion
      }

    default:
      return state
  }
}
