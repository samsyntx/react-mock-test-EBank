import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    userPin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()

    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    console.log(userDetails)
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onEnterUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onEnterUserPIN = event => {
    this.setState({
      userPin: event.target.value,
    })
  }

  renderUsedIdInput = () => {
    const {userId} = this.state

    return (
      <div className="input-container">
        <label htmlFor="userId" className="label">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          className="input-box"
          value={userId}
          placeholder="Enter User ID"
          onChange={this.onEnterUserId}
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {userPin} = this.state

    return (
      <div className="input-container">
        <label htmlFor="userPin" className="label">
          PIN
        </label>
        <input
          type="password"
          id="userPin"
          className="input-box"
          value={userPin}
          placeholder="Enter PIN"
          onChange={this.onEnterUserPIN}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="Form-main-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-form-image"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitUserDetails}>
            <h1 className="login-form-heading">Welcome Back!</h1>
            {this.renderUsedIdInput()}
            {this.renderPasswordInput()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
