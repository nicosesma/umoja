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
    event.preventDefault()
    const {id} = this.props
    const {reserved} = this.state

    const contact_name = 'Nico'
    const contact_email = 'themail@mail.net'
    const contact_number = '3105104150'
    console.log('reserved', reserved)
    if (!reserved) {
      console.log('reserved in method', reserved)
      this.setState({
        reserved: !this.state.reserved
      })

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

    return
  }

  render() {
    const className = this.state.reserved
      ? 'reservedSpot'
      : 'availableSpot'
    // console.log('className', className)
    // console.log('this.state', this.state)
    // console.log('this.props', this.props)
    return <div className={`VendorSpot ${className}`} onClick={e => this.clickOnSpot(e)}>
    </div>
  }
}

export default VendorSpot
