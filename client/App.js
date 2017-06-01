import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {createBrowserHistory} from 'history'

import $ from 'jquery'

import './style.css'

import AdminPage from './components/AdminPage'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import VendorMap from './components/VendorMap'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }

    this.registerUser = this.registerUser.bind(this)
    this.signOutUser = this.signOutUser.bind(this)
  }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(user_session => {
      console.log('DidMount user_session', user_session)
      this.setState({
        user: user_session
      })
    })
  }

  registerUser(user) {
    console.log('user registerUser', user)
    this.setState({
      user
    })
  }

  signOutUser(event) {
    event.preventDefault()

    return $.ajax({
      method: 'POST',
      url: '/signout',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(this.state.user)
    }).then(result => {
      console.log('result signOutUser', result)
      this.setState({
        user: null
      })
      window.location = '/'
    })
  }

  render() {
    console.log('this.state App', this.state)
    const {user} = this.state

    return <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path='/' component={
            e => <HomePage user={user}
              registerUser={this.registerUser} signOut={this.signOutUser} />
          } />
          <Route path='/map' component={
            e => <VendorMap user={user} signOut={this.signOutUser} />
          } />
          <Route path='/admin' component={
            e => user
              ? <AdminPage user={user} signOut={this.signOutUser} />
              : <AccessNotGranted user={user} signOut={this.signOutUser} />
          } />
          <Route path='/*' component={
            e => <NotFoundPage user={user} signOut={this.signOutUser} />
          } />
        </Switch>
    </Router>
  }
}

const AccessNotGranted = props => {
  return <div>
    <Navbar signOut={props.signOut} user={props.user} />
    <h1>Permission Denied</h1>
  </div>
}

const NotFoundPage = props => {
  return <div>
    <Navbar signOut={props.signOut} user={props.user} />
    <h1 className='NotFoundPage'>404 Error</h1>
    <h2 className='NotFoundPage'>Page Not Found</h2>
  </div>
}
