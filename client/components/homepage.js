import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="main">
      <h1>What's the color of your voice?</h1>
      {/* <span className="button" width="100px">
        Hi
      </span> */}
      <Link to="draw-options">
        <button type="button" className="main-btn">
          Begin
        </button>
      </Link>
    </div>
  )
}

export default HomePage
