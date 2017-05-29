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
      user_login: false
    }
    this.switchFormOptions = this.switchFormOptions.bind(this)
  }

  switchFormOptions(event) {
    console.log("in switchFormOptions")
    event.preventDefault()
    this.setState({
      user_login: !this.state.user_login
    })
  }

  render() {
    console.log('this.state AuthForm', this.state)

    return <div className='container'>
      <div className="col-sm-6 col-sm-offset-3">
        <FormOptions user_login={this.state.user_login} onClick={this.switchFormOptions} />
        {
          this.state.user_login
            ? <LoginForm />
            : <SignupForm />
        }
      </div>
    </div>
  }
}

const LoginForm = props => {
  return <form>
    <FormGroup label={'Email'} />
    <FormGroup label={'Password'} />
  </form>
}

const SignupForm = props => {
  return <form>
    <FormGroup label={'Organization:'} />
    <FormGroup label={'Name:'} />
    <FormGroup label={'Email:'} />
    <FormGroup label={'Password:'} />
  </form>
}

const FormGroup = props => {
  return <div className='form-group'>
    <label>{`${props.label}:`}</label>
    <input className='form-control' />
  </div>
}

const FormOptions = props => {
  console.log('props FormOptions', props)
  const {user_login, onClick} = props
  const btnClass = 'btn btn-lg btn-default'
  const enabledBtn = `${btnClass} active`
  // return <h1>Buttons!!!</h1>

  return <div className='button-form-options' style={HeaderStyle}>
    <button className={user_login ? btnClass : enabledBtn} onClick={e => onClick(e)}>Signup</button>
    <button className={user_login ? enabledBtn : btnClass} onClick={e => onClick(e)}>Login</button>
  </div>
}

export default AuthForm
