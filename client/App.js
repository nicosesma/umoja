import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import $ from 'jquery'

import './style.css'

import AdminPage from './components/AdminPage'
import HomePage from './components/HomePage'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      location: window.location,
      user: null
    }
  }

  render() {
    console.log('this.state', this.state)
    const {user} = this.state
    return <Router>
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
