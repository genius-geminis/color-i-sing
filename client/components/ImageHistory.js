import React from 'react'
import SingleImage from './SingleImage'
import {connect} from 'react-redux'

const ImageHistory = props => {
  const {images} = props || []

  return (
    <React.Fragment>
      <div id="account-image">
        <table id="account-table">
          <thead>
            <tr id="account-header">
              <th width="35%">Image </th>
              <th width="25%">Name</th>
              <th width="20%">Date</th>
              <th width="10%">Download</th>
              <th width="10%">Delete</th>
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
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  images: state.user.accountDetails.images
})

export default connect(mapStateToProps, null)(ImageHistory)
