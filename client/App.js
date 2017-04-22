import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {createBrowserHistory} from 'history'

import $ from 'jquery'

import './style.css'

import AdminPage from './components/AdminPage'
import HomePage from './components/HomePage'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      location: window.location,
      user: null,
      vendorMap: null
    }
  }

  componentDidMount() {
    return $.ajax({
      method: 'POST',
      url: '/api/map',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(map => {
      console.log('map', map)
      this.setState({
        vendorMap: map
      })
    })
  }

  render() {
    console.log('this.state', this.state)
    const {vendorMap, user} = this.state
    return <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={HomePage} user={user} />
        <Route path='/admin' component={AdminPage} user={user} />
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
