import React from 'react'
import {Link} from 'react-router-dom'

export const HomePage = () => {
  return (
    <div id="home-page">
      <h1 id="home-page-h1">What's the color of your voice?</h1>
      <div>
        <button type="button">
          <Link to="drawOptions">Get Started</Link>
        </button>
      </div>
    </div>
  )
}
