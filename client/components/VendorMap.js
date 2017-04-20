import React, {Component} from 'react'

import $ from 'jquery'

import './stylesheets/Vendors.css'

class VendorMap extends Component {
  constructor() {
    super()
    this.state = {
      vendorMap: null
    }
  }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/api/map',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(result => {
      console.log('result', result)
      this.setState({
        vendorMap: result
      })
    })
  }

  render() {
    return <div>
      <h2>This is going to be the New Map</h2>
    </div>
  }
}

export default VendorMap
