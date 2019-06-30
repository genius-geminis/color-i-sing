import React from 'react'
import {Tapable} from 'tapable'

const SingleImage = props => {
  const {image} = props

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
            <th>Image </th>
            <th>Name</th>
            <th>Date</th>
            <th>Change Name</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr key={image.id}>
            <td>
              <img src={image.imageUrl} width="150" />
            </td>
            <td>{image.name}</td>
            <td>{image.createAt}</td>
            <td>change name</td>
            <td>delete</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default SingleImage
