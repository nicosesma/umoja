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
      vendor_map: null,
      user: null
    }
  }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/api/map',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(map => {
      this.setState({
        vendor_map: map
      })
    })
  }

  render() {
    console.log('this.state App', this.state)
    const {vendor_map} = this.state
    return <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={e => <HomePage user={this.state.user} />} />
        <Route path='/map' component={e => <VendorMap vendor_map={vendor_map} user={this.state.user} />} />
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
