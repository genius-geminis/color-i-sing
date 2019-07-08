import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div id="home-page">
      <h1>What's the color of your voice?</h1>
      <div>
        <Link to="draw-options" className="button">
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default HomePage
