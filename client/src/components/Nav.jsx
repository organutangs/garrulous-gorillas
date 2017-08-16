import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Main from './Main.jsx';
import Login from './login/login.jsx';
import SignUp from './signup/signup.jsx';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.logout = () => {
      localStorage.clear();
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header" id="myNavbar" >
            <ul className="nav navbar-nav navbar-right">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/debates'>Debates</Link></li>
              { localStorage.token ? null : <li><Link to='/login'>Login</Link></li> }  
              { localStorage.token ? null : <li><Link to='/signup'>Signup</Link></li> }      
              { localStorage.token ? <li onClick={() => this.logout()}><Link to='/login'>Logout</Link></li> : null }
              { localStorage.username ? <li><Link to='/home'>{localStorage.username}</Link></li> : null }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;