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
    const imageData = {
      name: this.state.name,
      imageUrl: this.props.imageUrl,
      userId: this.props.userId
    }
    this.props.addImageThunk(imageData)
  }
  render() {
    return (
      <form onSubmit={this.uploadImage}>
        <label>Name</label>
        <input name="name" type="text" onChange={this.handleChange} />

        <label>Image Url</label>
        <input name="image" type="url" defaultValue={this.props.imageUrl} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.accountDetails.id,
  imageUrl: state.images.imageUrl,
  image: state.images.image,
  loading: state.images.loading
})

const mapDispatchToProps = dispatch => ({
  addImageThunk: image => dispatch(addImageThunk(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormAddImage)
