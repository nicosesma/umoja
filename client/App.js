import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router'

import $ from 'jquery'

import './style.css'

// import AdminDashboard from './components/AdminDashboard'
// import HomePage from './components/HomePage'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      location: window.location,
      user: null
    }
  }

  render() {
    return <Router>
      <Switch>
        <Route exact path='/' component={HomePage} user={user} />
        <Route path='/admin' component={AdminDashboard} user={user} />
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
