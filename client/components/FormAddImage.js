import React from 'react'
import {addImageThunk} from '../store'
import {connect} from 'react-redux'

class FormAddImage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  uploadImage() {
    event.preventDefault()
    this.props.addImageThunk(this.state)
  }
  render() {
    return (
      <form onSubmit={this.uploadImage}>
        <label>Name</label>
        <input name="name" type="text" onChange={this.handleChange} />

        <label>Image Url</label>
        <input name="image" type="url" defaultValue={this.props.dataUrl} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// const mapStateToProps = state => ({
//   image: state.images.image,
//   loading: state.images.loading
// })

const mapDispatchToProps = dispatch => ({
  addImageThunk: image => dispatch(addImageThunk(image))
})

export default connect(null, mapDispatchToProps)(FormAddImage)
