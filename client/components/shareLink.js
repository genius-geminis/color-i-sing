import React from 'react'
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook'
import Twitter from 'react-sharingbuttons/dist/buttons/Twitter'
import {connect} from 'react-redux'

const ShareLink = props => {
  return (
    <div>
      <Facebook url={props.link} />
      <Twitter url={props.link} />
    </div>
  )
}

const mapStateToProps = state => ({
  link: state.imagesShare.link
})

export default connect(mapStateToProps)(ShareLink)
