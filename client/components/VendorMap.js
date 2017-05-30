import React, {Component} from 'react'

import $ from 'jquery'

import Navbar from './Navbar'
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
      console.log('map VendorMap DidMount', map)
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
      return <div>
        <Navbar signOut={this.props.signOutUser} user={this.props.user} />
        <h1>Please Login to view Map</h1>
      </div>
    }

    return <div>
      <Navbar signOut={this.props.signOut} user={this.props.user} />
      <br />
      <div ref='map_reference' className='container col-sm-6 col-sm-offset-3'>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 0, 11, this.props.user.id)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 11, 22, this.props.user.id)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 22, 33, this.props.user.id)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 33, 44, this.props.user.id)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 44, 55, this.props.user.id)}
        </div>
      </div>
    </div>
  }
}

const renderMapLine = (vendor_map, start, end, current_user_id) => {
  const mapArray = []
  if (vendor_map) {
    for (let i = start; i < end; i++) {
      mapArray.push(<VendorSpot key={i} spot_id={i+1} reserved={vendor_map[i].reserved} user_id={vendor_map[i].user_id} current_user_id={current_user_id} />)
    }
  }
  return mapArray
}

export default VendorMap
