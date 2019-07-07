import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import images from './images'
import drawOptions from './drawOptions'
import imagesShare from './imagesShare'

const reducer = combineReducers({user, images, drawOptions, imagesShare})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './drawOptions'
export * from './images'
export * from './imagesShare'
