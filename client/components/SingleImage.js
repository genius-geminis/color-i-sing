import React from 'react'
import {deleteImageThunk} from '../store'
import {connect} from 'react-redux'
import {convertDateToString} from '../../util/convertDateToString'

const SingleImage = props => {
  const {image} = props

  return (
    <>
      <tbody id="account-body">
        <tr key={image.id}>
          <td>
            <img src={image.imageUrl} width="150" />
          </td>
          <td>{image.name}</td>
          <td>{convertDateToString(image.createdAt)}</td>
          <td>
            <a
              href={props.image.imageUrl}
              download="image"
              className="download"
            >
              {/* <button type="button" > */}
              Download
              {/* </button> */}
            </a>
          </td>
          <td>
            <button
              type="button"
              className="clear-btn"
              onClick={() => props.deleteImageThunk(image.id)}
            >
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteImageThunk: id => dispatch(deleteImageThunk(id))
})

export default connect(null, mapDispatchToProps)(SingleImage)
