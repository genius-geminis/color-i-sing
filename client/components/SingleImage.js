import React from 'react'
import {deleteImageThunk} from '../store'
import {connect} from 'react-redux'
import {convertDateToString} from '../../util/convertDateToString'

const SingleImage = props => {
  const {image} = props

  return (
    <React.Fragment>
      <tbody id="account-body">
        <tr key={image.id}>
          <td>
            <img src={image.imageUrl} width="150" />
          </td>
          <td>{image.name}</td>
          <td>{convertDateToString(image.createdAt)}</td>
          <td>
            <button type="button">
              <a href={props.image.imageUrl} download="image">
                Download
              </a>
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={() => props.deleteImageThunk(image.id)}
            >
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteImageThunk: id => dispatch(deleteImageThunk(id))
})

export default connect(null, mapDispatchToProps)(SingleImage)
