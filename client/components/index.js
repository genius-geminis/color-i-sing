/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {Login, Signup} from './auth-form'
export {default as Draw} from './draw'
export {default as UserAccount} from './account'
export {default as FormAddImage} from './FormAddImage'
export {default as SingleImage} from './SingleImage'
export {default as ImageHistory} from './ImageHistory'
export {default as drawOptions} from './drawOptions'
export {default as HomePage} from './homepage'
export {default as ShareModal} from './shareModal'
export {Footer} from './footer'
export {ColorPalette} from './colorPalette'
