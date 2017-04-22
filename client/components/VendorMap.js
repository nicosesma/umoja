import React, {Component} from 'react'

import $ from 'jquery'

import VendorSpot from './VendorSpot'

import './stylesheets/Vendors.css'

class VendorMap extends Component {
  constructor() {
    super()
    this.state = {
      vendorMap: null
    }
  }

  // componentDidMount() {
  //   return $.ajax({
  //     method: 'POST',
  //     url: '/api/map',
  //     contentType: 'application/json; charset=utf-8',
  //     dataType: 'json'
  //   }).then(result => {
  //     console.log('result', result)
  //     this.setState({
  //       vendorMap: result
  //     })
  //   })
  // }

  render() {
    // console.log('this.state', this.state)
    console.log('this.props', this.props)
    const theMap = this.props.vendorMap
      ? this.props.vendorMap.map(spot => {
        // console.log('spot', spot)
        return <VendorSpot key={spot.id} id={spot.id} />
      })
      : null
    // console.log('theMap', theMap)
    // const firstPart = theMap.slice(0, 12)
    return <div>
      {theMap}
    </div>
  }
}

export default VendorMap
