import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import DebateItem from './DebateItem.jsx';
import UserInfo from './profile/UserInfo.jsx';
import UserArgs from './profile/UserArgs.jsx';
import UserVotes from './profile/UserVotes.jsx';
import UserDebates from './profile/UserDebates.jsx';
//may just have a button to filter for arguments and debates that a user created
//need to have argument information: look at the functions and files inside of the debate folder
//need to have debate list information
class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='profile'>
        <div className="container">
          <h1 className="title">Profile</h1>
          <h3 className="caption"> Who are you? </h3>
          <div className="row" id="userInfo">
            <div>My Info</div>
            <UserInfo/>
          </div>
          <div className="row" id ="Activity">
            <div className="col-md-6" id ="userDebates">
              What are you debating?
              <UserDebates/>
            </div>
            <div className="col-md-6" id ="userArguments">
              What are your arguments?
              <UserArgs/>
              <div>Arg1</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;