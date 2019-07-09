import React from 'react'
import ShareLink from './shareLink'

export default class ShareModal extends React.Component {
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
      <div className="social-modal">
        <div className={this.showHideClassName()}>
          <ShareLink />
          <button type="button" onClick={() => this.setState({show: false})}>
            Close
          </button>
        </div>
      </div>
    )
  }
}
