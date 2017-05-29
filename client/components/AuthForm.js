import React, {Component} from 'react'
import $ from 'jquery'

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
}

class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      user_login: false,
      email: '',
      name: '',
      password: '',
      confirm_password: '',
      organization: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.switchFormOptions = this.switchFormOptions.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  onFormSubmit(event) {
    event.preventDefault()
    const {user_login, email, name, password, confirm_password, organization, invite_code} = this.state

    if (user_login) {
      const loginAttributes = {
        email,
        password
      }

      return $.ajax({
        method: 'POST',
        url: '/login',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(loginAttributes)
      }).then(result => {
        console.log('result Login API', result)
      })
    } else if (!user_login) {
      const new_user_attributes = {
        email,
        name,
        password,
        organization
      }

      if (password === confirm_password && password !== '') {
        return $.ajax({
          method: 'POST',
          url: '/create_user',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: JSON.stringify({new_user_attributes, invite_code})
        }).then(result => {
          console.log('result Signup API', result)
          return this.props.registerUser(result)
        })
      }
    }
  }

  switchFormOptions(event) {
    event.preventDefault()
    this.setState({
      user_login: !this.state.user_login
    })
  }

  updateInput(event, context) {
    event.preventDefault()
    if (context === 'name') {
      this.setState({
        name: event.target.value
      })
    }
    if (context === 'organization') {
      this.setState({
        organization: event.target.value
      })
    }
    if (context === 'email') {
      this.setState({
        email: event.target.value
      })
    }
    if (context === 'password') {
      this.setState({
        password: event.target.value
      })
    }
    if (context === 'confirm_password') {
      this.setState({
        confirm_password: event.target.value
      })
    }
    if (context === 'invite_code') {
      this.setState({
        invite_code: event.target.value
      })
    }
  }

  render() {
    // console.log('this.state AuthForm', this.state)

    return <div className='container'>
      <div className="col-sm-6 col-sm-offset-3">
        <SwitchFormButtons user_login={this.state.user_login} onClick={this.switchFormOptions} />
        <RegistrationForm user_login={this.state.user_login} updateInput={this.updateInput} attributes={this.state} onSubmit={this.onFormSubmit} />
      </div>
    </div>
  }
}

const RegistrationForm = props => {
  const {user_login, onSubmit, updateInput, attributes} = props
  return <form>
    {
      !user_login
        ? [
          <FormGroup key={0} label={'Name'} context={'name'} value={attributes.name} updateInput={updateInput} />,
          <FormGroup key={1} label={'Organization'} context={'organization'} value={attributes.organization} updateInput={updateInput} />
        ]
        : null
    }
    <FormGroup label={'Email'} context={'email'} value={attributes.email} updateInput={updateInput} />
    <FormGroup label={'Password'} password_type={true} context={'password'} value={attributes.password} updateInput={updateInput} />
    {
      !user_login
        ? [
          <FormGroup key={2} label={'Confirm Password'} password_type={true} context={'confirm_password'} value={attributes.confirm_password} updateInput={updateInput} />,
          <FormGroup key={3} label={'Invite Code'} context={'invite_code'} value={attributes.invite_code} updateInput={updateInput} />
        ]
        : null
    }
    <button className='btn btn-lg btn-success' onClick={e => onSubmit(e)}>Submit</button>
  </form>
}

const FormGroup = props => {
  const {label, context, password_type, updateInput} = props

  return <div className='form-group'>
    <label>{`${label}:`}</label>
    <input className='form-control' type={password_type ? 'password' : 'text'} onChange={e => updateInput(e, context)} />
  </div>
}

const SwitchFormButtons = props => {
  const {user_login, onClick} = props
  const btnClass = 'btn btn-lg btn-default'
  const enabledBtn = `${btnClass} active`

  return <div className='button-form-options' style={HeaderStyle}>
    <button className={user_login ? btnClass : enabledBtn} disabled={!user_login} onClick={e => onClick(e)}>Signup</button>
    <button className={user_login ? enabledBtn : btnClass} disabled={user_login} onClick={e => onClick(e)}>Login</button>
  </div>
}

export default AuthForm
