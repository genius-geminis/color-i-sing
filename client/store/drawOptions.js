import history from '../history'
/**
 * ACTION TYPES
 */
const SELECT_PALETTE = 'SELECT_PALETTE'
const SELECT_TEMPLATE = 'SELECT_TEMPLATE'

/**
 * INITIAL STATE
 */
const initialState = {
  palette: '',
  template: ''
}

/**
 * ACTION CREATORS
 */
export const choosePalette = palette => ({
  type: SELECT_PALETTE,
  palette
})

export const chooseTemplate = template => ({
  type: SELECT_TEMPLATE,
  template
})

// THUNK

export const getPaletteTemplate = (palette, template) => dispatch => {
  dispatch(choosePalette(palette))
  dispatch(chooseTemplate(template))
  history.push('/draw')
}

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
    case SELECT_TEMPLATE:
      return {
        ...state,
        template: action.template
      }
    default:
      return state
  }
}
