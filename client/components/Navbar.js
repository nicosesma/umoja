import React, {Component} from 'react'

class NavBar extends Component {
  render() {
    console.log('this.props NavBar', this.props)

    return <div>
      <ul>
        <li onClick={e => window.location = '/'}>Home</li>
        {
          this.props.user
            ? <li onClick={e => this.props.signOut(e)}>Sign Out</li>
            : null
        }
      </ul>
      {this.props.children}
    </div>
  }
}

export default NavBar
