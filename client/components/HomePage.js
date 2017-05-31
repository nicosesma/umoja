import React, {Component} from 'react'
import $ from 'jquery'

import AuthForm from './AuthForm'
import Navbar from './Navbar'

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
      <Navbar signOut={this.props.signOut} user={this.props.user} />
      <h1 style={HeaderStyle}>Umoja Festival Vendor Registration</h1>
      <div className={'container'}>
      {
        !this.props.user
          ? <AuthForm registerUser={this.props.registerUser} />
          : <button style={HeaderStyle} className='btn btn-success btn-lg' onClick={e => window.location = '/map'}>Go to Map</button>
      }
      </div>
    </div>
  }
}

export default HomePage
