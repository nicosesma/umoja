import React, {Component} from 'react'

import Navbar from './Navbar'

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'center'
}

class AdminPage extends Component {
  render() {

    return <div>
      <Navbar signOut={this.props.signOut} user={this.props.user} />
      {
        this.props.user
          ? this.props.user.admin
            ? <h1 style={HeaderStyle}>Welcome Admin</h1>
            : <h1 style={HeaderStyle}>Access Not Granted</h1>
          : <h1 style={HeaderStyle}>Access Not Granted</h1>
      }
    </div>
  }
}

export default AdminPage
