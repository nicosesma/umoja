import React, {Component} from 'react'

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
    this.setState({
      reserved: !this.state.reserved
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
