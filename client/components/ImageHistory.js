import React from 'react'
import SingleImage from './SingleImage'
import {connect} from 'react-redux'

const ImageHistory = props => {
  const {images} = props || []

  return (
    <React.Fragment>
      {images && images.length > 0 ? (
        images.map(image => {
          return <SingleImage image={image} key={image.name} />
        })
      ) : (
        <p>No images yet</p>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  images: state.account.accountDetails.images
})

export default connect(mapStateToProps, null)(ImageHistory)
