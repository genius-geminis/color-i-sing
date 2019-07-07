/**
 * ACTION TYPES
 */
const SELECT_PALETTE = 'SELECT_PALETTE'
const SELECT_BRUSH_MOTION = 'SELECT_BRUSH_MOTION'
const SELECT_TEMPLATE = 'SELECT_TEMPLATE'

/**
 * INITIAL STATE
 */
const initialState = {
  palette: 'rainbow',
  brushMotion: '',
  template: 'flower'
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
export const chooseTemplate = template => ({
  type: SELECT_TEMPLATE,
  template
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
    case SELECT_TEMPLATE:
      return {
        ...state,
        template: action.template
      }
    default:
      return state
  }
}
