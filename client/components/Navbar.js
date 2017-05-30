import React, {Component} from 'react'

const NavBarStyle = {
  display: 'flex',
  listStyle: 'none',
  flexDirection: 'row',
  justifyContent: 'space-around',
  color: 'white',
  margin: '1em 5em'
}

const NavBarFontColor = {
}

class NavBar extends Component {
  constructor() {
    super()
    this.redirectToAdminDashboard = this.redirectToAdminDashboard.bind(this)
  }

  redirectToAdminDashboard(event) {
    event.preventDefault()
    window.location = '/admin'
  }

  render() {
    console.log('this.props NavBar', this.props)
    // <ul style={NavBarStyle} className='pull-right'>

    return <div className='navbar navbar-inverse'>
      <ul style={NavBarStyle} className='pull-right'>
        <li onClick={e => window.location = '/'}>Home</li>
        {
          this.props.user
            ? this.props.user.admin
              ? [
                <li key={0} style={{marginLeft: '1em'}} onClick={e => this.redirectToAdminDashboard(e)}>
                  Dashboard
                </li>,
                <li key={1} style={{marginLeft: '1em'}} onClick={e => this.props.signOut(e)}>Sign Out</li>
              ]
              : <li style={{margin: '0 1em'}} onClick={e => this.props.signOut(e)}>Sign Out</li>
            : null
        }
      </ul>
      {this.props.children}
    </div>
  }
}

export default NavBar
