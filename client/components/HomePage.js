import React, {Component} from 'react'

import './stylesheets/Vendors.css'

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      vendorMap: null
    }

    this.onVendorSpotClick = this.onVendorSpotClick.bind(this)
  }

  onVendorSpotClick(event) {
    event.preventDefault()
  }

  render() {
    console.log('this.props', this.props.user)
    const vendorSpots = (start, end) => {
      console.log('in vedorSpots')
      let arr = []
      for (let i = start; i < end; i++) {
        console.log('i in forloop', i)
        arr.push(<div key={i} id={i} className='VendorSpot' />)
      }
      return arr
    }
    return <div>
      <h1>Hello World!</h1>
      <div className='VendorMap'>
        {vendorSpots(1, 19)}
      </div>
      <div className='VendorMap'>
        {vendorSpots(20, 38)}
      </div>
      <div className='VendorMap'>
        {vendorSpots(39, 56)}
      </div>
    </div>
  }
}

export default HomePage
