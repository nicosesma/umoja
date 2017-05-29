import React, {Component} from 'react'
import $ from 'jquery'

import AuthForm from './AuthForm'

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
      <div className={'container'}>
        <AuthForm registerUser={this.props.registerUser} />
      </div>
    </div>
  }
}

export default HomePage
