import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="main">
      <h1>
        Paint with all the colors <br />of your voice
      </h1>
      <h3>~ digital coloring book that lets your voice be the paintbrush ~</h3>

      <Link to="draw-options">
        <button type="button" className="main-btn">
          Begin
        </button>
      </Link>
    </div>
  )
}

export default HomePage
