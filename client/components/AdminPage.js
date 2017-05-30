import React, {Component} from 'react'

import Navbar from './Navbar'

class AdminPage extends Component {
  render() {
    return <div>
      <Navbar signOut={this.props.signOut} user={this.props.user} />
      <h1>Welcome Admin</h1>
    </div>
  }
}

export default AdminPage
