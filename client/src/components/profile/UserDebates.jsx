import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';
import UserDebItem from './UserDebItem.jsx';

class UserDebates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false,
      status: 'Vote Here',
    }
  }

  componentWillMount() {

  }

  render() {
    return(
      <div>
        {this.props.debates.map( (debate, index) => <UserDebItem debate={debate}/>)}
      </div>
    );
  }
}
export default UserDebates;
