import React, {Component} from 'react'

import $ from 'jquery'

import './stylesheets/Vendors.css'

class VendorSpot extends Component {
  constructor() {
    super()
    this.state = {
      reserved: false
    }

    this.clickOnSpot = this.clickOnSpot.bind(this)
  }

  clickOnSpot(event) {
    const {id} = this.props
    event.preventDefault()
    this.setState({
      reserved: !this.state.reserved
    })
    const contact_name = 'Nico'
    const contact_email = 'themail@mail.net'
    const contact_number = '3105104150'
    return $.ajax({
      method: 'POST',
      url: '/api/reserve',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({
        id,
        contact_name,
        contact_email,
        contact_number,
        reserved: true
      })
    }).then(result => {
      console.log('result', result)
    })
  }

  render() {
    const className = this.state.reserved
      ? 'reservedSpot'
      : 'availableSpot'
    console.log('className', className)
    console.log('this.state', this.state)
    console.log('this.props', this.props)
    return <div className={`VendorSpot ${className}`} onClick={e => this.clickOnSpot(e)}>
    </div>
  }
}

export default VendorSpot
