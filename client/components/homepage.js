import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div id="home-page">
      <h2>What's the color of your voice?</h2>
      <div>
        <Link to="drawOptions">
          <button type="button">Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
