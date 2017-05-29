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

    return <div className='VendorMap'>
      <div className='container'>
        <div className='VendorMapRow'>
          {renderMapLine(this.props.vendor_map, 0, 11)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(this.props.vendor_map, 11, 22)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(this.props.vendor_map, 22, 33)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(this.props.vendor_map, 33, 44)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(this.props.vendor_map, 44, 55)}
        </div>
      </div>
    </div>
  }
}

const renderMapLine = (vendor_map, start, end) => {
  const mapArray = []
  if (vendor_map) {
    for (let i = start; i < end; i++) {
      console.log('vendor_map[i]', vendor_map[i].reserved)
      mapArray.push(<VendorSpot key={i} reserved={vendor_map[i].reserved} />)
    }
  }
  return mapArray
}

export default VendorMap
