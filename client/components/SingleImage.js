import React from 'react'
import {deleteImageThunk} from '../store'
import {connect} from 'react-redux'

const SingleImage = props => {
  const {image} = props
  console.log(props)

  return (
    <React.Fragment>
      <table
        style={{
          width: '75%',
          textAlign: 'left',
          padding: '5px',
          border: '1px solid grey'
        }}
      >
        <thead>
          <tr>
            <th width="35%">Image </th>
            <th width="25%">Name</th>
            <th width="20%">Date</th>
            <th width="10%">Doanload</th>
            <th width="10%">Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr key={image.id}>
            <td>
              <img src={image.imageUrl} width="150" />
            </td>
            <td>{image.name}</td>
            <td>{image.createdAt.slice(0, 10)}</td>
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
      </table>
    </React.Fragment>
  )
}
const mapStateToProps = state => ({
  images: state.images.image
})

const mapDispatchToProps = dispatch => ({
  deleteImageThunk: id => dispatch(deleteImageThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleImage)
