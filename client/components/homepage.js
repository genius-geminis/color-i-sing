import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="main">
      <h1>What's the color of your voice?</h1>
      {/* <span className="button" width="100px">
        Hi
      </span> */}
      <button type="button">
        <Link to="draw-options">Begin</Link>
      </button>
    </div>
  )
}

export default HomePage
