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
      vendor_map: null
    }
  }

  // componentDidMount() {
  //   return $.ajax({
  //     method: 'POST',
  //     url: '/api/map',
  //     contentType: 'application/json; charset=utf-8',
  //     dataType: 'json'
  //   }).then(map => {
  //     console.log('map', map)
  //     this.setState({
  //       vendorMap: map
  //     })
  //   })
  // }

  getInitialState() {
    return $.ajax({
      method: 'POST',
      url: '/api/map',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).then(vendor_map => {
      console.log('vendor_map', vendor_map)
      this.setState({
        vendor_map
      })
    })
  }

  render() {
    console.log('this.state App', this.state)
    const {vendorMap} = this.state
    return <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={HomePage} />
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
