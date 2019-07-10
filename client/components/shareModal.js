import React from 'react'
import {Facebook, Twitter, Pinterest, Email} from 'react-sharingbuttons'
import {connect} from 'react-redux'

class ShareModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  showHideClassName = () => {
    return this.state.show ? 'modal display-block' : 'modal display-none'
  }

  render() {
    return (
      <div className={this.showHideClassName()}>
        <div className="social-share__modal ">
          <span>
            <Facebook url={this.props.link} />
          </span>
          <span>
            <Twitter url={this.props.link} />
          </span>
          <span>
            <Pinterest url={this.props.link} />
          </span>
          <span>
            <Email url={this.props.link} />
          </span>
          <button
            style={{marginTop: '15px'}}
            type="button"
            onClick={() => this.setState({show: false})}
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  link: state.imagesShare.link
})

export default connect(mapStateToProps)(ShareModal)
