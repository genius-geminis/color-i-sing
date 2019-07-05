import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const HomePage = () => {
  return (
    <Wrapper>
      <Title>What's the color of your voice?</Title>
      <div>
        <Button type="button">
          <Link to="drawOptions">Get Started</Link>
        </Button>
      </div>
    </Wrapper>
  )
}

// styled component
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  text-shadow: 2px 2px grey;
  color: 808000;
  text-decoration: underline;
`

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  font-family: 'Courier New', Courier, monospace;
`

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  text-align: center;
`

export default HomePage
