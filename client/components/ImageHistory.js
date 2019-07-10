import React from 'react'
import SingleImage from './SingleImage'
import {connect} from 'react-redux'

const ImageHistory = props => {
  const {images} = props || []

  return (
    <div className="account-history-container">
      <table className="account-history__table">
        <thead>
          <tr>
            <th width="25%">Image </th>
            <th width="25%">Name</th>
            <th width="20%">Date</th>
            <th width="15%">Download</th>
            <th width="15%">Delete</th>
          </tr>
        </thead>
        {images && images.length > 0 ? (
          images.map(image => {
            return <SingleImage image={image} key={image.name} />
          })
        ) : (
          <p>No images yet</p>
        )}
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  images: state.user.accountDetails.images
})

export default connect(mapStateToProps, null)(ImageHistory)
