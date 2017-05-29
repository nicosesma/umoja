import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {createBrowserHistory} from 'history'

import $ from 'jquery'

import './style.css'

import AdminPage from './components/AdminPage'
import HomePage from './components/HomePage'
import VendorMap from './components/VendorMap'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }

    this.registerUser = this.registerUser.bind(this)
  }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(user_session => {
      // console.log('user_session', user_session)
      this.setState({
        user: user_session
      })
    })
  }

  registerUser(user) {
    this.setState({
      user
    })
  }

  render() {
    console.log('this.state App', this.state)
    const {vendor_map} = this.state
    return <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={e => <HomePage user={this.state.user} registerUser={this.registerUser} />} />
        <Route path='/map' component={e => <VendorMap user={this.state.user} />} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/*' component={NotFoundPage} />
      </Switch>
    </Router>
  }
}

const NotFoundPage = props => {
  return <h1 className='NotFoundPage'>
    Page Not Found
  </h1>
}
