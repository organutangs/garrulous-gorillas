import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';
import UserArgItem from './UserArgItem.jsx';

class UserArgs extends React.Component {
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
        {this.props.args.map( (arg, index) => <UserArgItem arg={arg}/>)}
      </div>
      )
  }
}
export default UserArgs;


