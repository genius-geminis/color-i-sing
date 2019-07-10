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
      <div className="authform-outer-container">
        <div className="authform-inner-container">
          <form onSubmit={this.uploadImage}>
            <label>Name</label>
            <input
              placeholder="Awesome Masterpiece"
              name="name"
              type="text"
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
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
