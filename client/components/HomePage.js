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
    this.state = {
      user_booths: null
    }
  }

  componentDidMount() {
    console.log('ComponentMount for HomePage')
    if (this.props.user) {
      console.log('true', true)
      // this.setState({
      //   user_booths: true
      // })
      return $.ajax({
        method: 'POST',
        url: '/api/map/user_reservations',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
      }).then(result => {
        this.setState({
          user_booths: result
        })
      })
    } else {
      console.log('false', false)
      return null
    }
  }

  render() {
    // console.log('this.props HomePage', this.props)
    const showUserBooths = () => {
      console.log('hizzle', this.state)
      const reservationsArray = []
      for (let i = 0; i < this.state.user_booths.length; i++) {
        reservationsArray.push(<ShowReservations key={i} booth={this.state.user_booths[i]} />)
      }
      return reservationsArray
    }

    return <div>
      <Navbar signOut={this.props.signOut} user={this.props.user} />
      <h1 style={HeaderStyle}>Umoja Festival Vendor Registration</h1>
      <div className={'container'}>
      {
        !this.props.user
          ? <AuthForm registerUser={this.props.registerUser} />
          : <button style={HeaderStyle} className='btn btn-success btn-lg' onClick={e => window.location = '/map'}>Go to Map</button>
      }
      {
        this.state.user_booths
          ? <div>
            <h1 style={HeaderStyle}>Your Booths</h1>
            {showUserBooths()}
          </div>
          : null
        // if (this.state.user_booths) {
        //   for (let i = 0; i < this.state.user_booths; i++) {
        //     return <ShowReservations key={i} booth={this.state.user_booths[i]} />
        //   }
        // } else {
        //   return null
        // }
      }
      </div>
    </div>
  }
}

const ShowReservations = props => {
  console.log('foshizzle')
  return <div style={HeaderStyle}>
    <h2>Booth: {props.booth.id}</h2>
  </div>
}

export default HomePage
