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
    const {vendorMap} = this.props
    const theMap = this.props.vendorMap
      ? renderVendorMap(this.props.vendorMap, 1, 12)
      : null
    // console.log('theMap', theMap)
    // const firstPart = theMap.slice(0, 12)
    const theSecondRow = renderVendorMap(vendorMap, 12, 23)
    return <div>
      <div className='VendorMap'>
        {theMap}
      </div>
      <br />
      <div className='VendorMap'>
        {theSecondRow}
      </div>
    </div>
  }
}

// this.props.vendorMap.reduce((result, spot) => {
//     // console.log('spot', spot)
//     // console.log('spot', spot)
//     // return <VendorSpot key={spot.id} id={spot.id} />
//     const firstRow = []
//     if (spot.id < 12) {
//       firstRow.push(<VendorSpot key={spot.id} id={spot.id} />)
//     }
//     result = [firstRow]
//   }, [])

const renderVendorMap = (map, start, end) => {
  let firstMapRow = []
  let secondRow = []
  map.forEach(spot => {
    console.log('spot in renderMap', spot)
    const {id, reserved} = spot
    if (id >= start && id < end) {
      firstMapRow.push(<VendorSpot key={id} id={id} reserved={reserved} />)
    }
    // if (id > 12 && id < 23) {
    //   secondRow.push(<VendorSpot key={id} id={id} />)
    // }
  })
  return firstMapRow
}

export default VendorMap
