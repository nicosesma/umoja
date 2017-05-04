import React, {Component} from 'react'

import $ from 'jquery'

import VendorSpot from './VendorSpot'

import VendorMap from './VendorMap'

import './stylesheets/Vendors.css'

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      vendorMap: null
    }

    // this.onVendorSpotClick = this.onVendorSpotClick.bind(this)
  }

  // onVendorSpotClick(event) {
  //   event.preventDefault()
  // }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/api/map',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(result => {
      this.setState({
        vendorMap: result
      })
    })
  }

  render() {
    // console.log('this.props', this.props.user)
    const {vendorMap} = this.state
    // console.log('this.props HomePage', this.props)
    const vendorSpots = (start, end) => {
      // console.log('in vedorSpots')
      let arr = []
      for (let i = start; i < end; i++) {
        // console.log('i in forloop', i)
        arr.push(<VendorSpot key={i} id={i} />)
      }
      return arr
    }

    const renderMap = this.state.vendorMap
      ? <VendorMap vendorMap={vendorMap} />
      :null

    return <div>
      <h1>Vendors Map!</h1>
      {renderMap}
    </div>
  }
}

const theFirstMap = props => {
  return <div>
    <div className='VendorMap'>
      {vendorSpots(45, 56)}
    </div>
    <br />
    <div className='VendorMap'>
      {vendorSpots(34, 45)}
    </div>
    <div className='VendorMap'>
      {vendorSpots(23, 34)}
    </div>
    <br />
    <div className='VendorMap'>
      {vendorSpots(12, 23)}
    </div>
    <div className='VendorMap'>
      {vendorSpots(1, 12)}
    </div>
  </div>
}


export default HomePage
