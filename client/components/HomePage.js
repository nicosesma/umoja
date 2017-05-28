import React, {Component} from 'react'
import $ from 'jquery'

import './stylesheets/Vendors.css'

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
}

class HomePage extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('this.props HomePage', this.props)

    return <div>
      <h1 style={HeaderStyle}>Umoja Festival Vendor Registration</h1>
      <h3 style={HeaderStyle}>Please Login</h3>
    </div>
  }
}

export default HomePage
