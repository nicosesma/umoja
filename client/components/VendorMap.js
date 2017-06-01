import React, {Component} from 'react'

import $ from 'jquery'

import Navbar from './Navbar'
import VendorSpot from './VendorSpot'

import './stylesheets/Vendors.css'

class VendorMap extends Component {
  constructor() {
    super()
    this.state = {
      vendor_map: null,
      user_can_reserve: null,
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
          vendor_map: map.vendorMap,
          user_can_reserve: map.user_can_reserve
        })
      }
    })
  }

  render() {
    console.log('this.props VendorMap Component', this.props)
    console.log('this.state VendorMap', this.state)

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
          {renderMapLine(vendor_map, 0, 11, this.props.user, this.props.user_can_reserve, this.props.two_booths, this.props.userReservationUpdate)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 11, 22, this.props.user, this.props.user_can_reserve, this.props.two_booths, this.props.userReservationUpdate)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 22, 33, this.props.user, this.props.user_can_reserve, this.props.two_booths, this.props.userReservationUpdate)}
        </div>
        <br />
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 33, 44, this.props.user, this.props.user_can_reserve, this.props.two_booths, this.props.userReservationUpdate)}
        </div>
        <div className='VendorMapRow'>
          {renderMapLine(vendor_map, 44, 55, this.props.user, this.props.user_can_reserve, this.props.two_booths, this.props.userReservationUpdate)}
        </div>
      </div>
    </div>
  }
}

const renderMapLine = (vendor_map, start, end, user, user_can_reserve, two_booths, userReservationUpdate) => {
  const mapArray = []
  if (vendor_map) {
    for (let i = start; i < end; i++) {
      if (vendor_map[i].user_id === user.id) {
        mapArray.push(<VendorSpot key={i} spot_id={i+1} reserved={vendor_map[i].reserved} user_reservation={true} user_can_reserve={user ? user_can_reserve : null} two_booths={two_booths} userReservationUpdate={userReservationUpdate} />)
      } else if (vendor_map[i].user_id !== user.id) {
        mapArray.push(<VendorSpot key={i} spot_id={i+1} reserved={vendor_map[i].reserved} user_id={vendor_map[i].user_id} current_user_id={user.id} user_can_reserve={user ? user_can_reserve : null} two_booths={two_booths} userReservationUpdate={userReservationUpdate} />)
      }
    }
  }
  return mapArray
}

export default VendorMap
