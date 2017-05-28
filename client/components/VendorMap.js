import React, {Component} from 'react'

import $ from 'jquery'

import VendorSpot from './VendorSpot'

import './stylesheets/Vendors.css'

class VendorMap extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('this.props VendorMap Component', this.props)

    return <div>
      <div className='VendorMap'>
        Rendering something in Map component
      </div>
      <br />
      <div className='VendorMap'>
      </div>
    </div>
  }
}

export default VendorMap
