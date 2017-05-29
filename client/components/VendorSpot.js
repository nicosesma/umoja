import React, {Component} from 'react'

import $ from 'jquery'

import './stylesheets/Vendors.css'

// TODO: See how to integrate the reserved property from props with the state

class VendorSpot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reserved: this.props.reserved
    }
    this.clickOnSpot = this.clickOnSpot.bind(this)
  }

  clickOnSpot(event) {
    event.preventDefault()
    const {reserved} = this.state
    // const {id, reserved} = this.props

    if (!reserved) {
      this.setState({
        reserved: !this.state.reserved
      })

      // return $.ajax({
      //   method: 'POST',
      //   url: '/api/reserve',
      //   contentType: 'application/json; charset=utf-8',
      //   dataType: 'json',
      //   data: JSON.stringify({
      //     id,
      //     user_id,
      //     reserved: true
      //   })
      // }).then(result => {
      //   console.log('result', result)
      // })
    }
  }

  render() {
    const className = this.state.reserved
      ? 'reservedSpot'
      : 'availableSpot'

    return <div className={`VendorSpot ${className}`} onClick={e => this.clickOnSpot(e)}>
    </div>
  }
}

export default VendorSpot
