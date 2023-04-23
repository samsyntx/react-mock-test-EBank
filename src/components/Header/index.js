import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-bar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="bank-logo"
      />
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
