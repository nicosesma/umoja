import React, {Component} from 'react'

import $ from 'jquery'

import VendorSpot from './VendorSpot'

import './stylesheets/Vendors.css'

class VendorMap extends Component {
  constructor() {
    super()
    this.state = {
      vendor_map: null
    }
  }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/api/map',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(map => {
      if (this.refs.map_reference) {
        this.setState({
          vendor_map: map
        })
      }
    })
  }

  render() {
    console.log('this.props VendorMap Component', this.props)

    const {vendor_map} = this.state

    if (!this.props.user) {
      return <h1>Please Login to view Map</h1>
    }

    return <div className='VendorMap'>
      <div ref='map_reference' className='container'>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 0, 11)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 11, 22)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 22, 33)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 33, 44)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 44, 55)}
        </div>
      </div>
    </div>
  }
}

const renderMapLine = (vendor_map, start, end) => {
  const mapArray = []
  if (vendor_map) {
    for (let i = start; i < end; i++) {
      mapArray.push(<VendorSpot key={i} id={i+1} reserved={vendor_map[i].reserved} />)
    }
  }
  return mapArray
}

export default VendorMap
