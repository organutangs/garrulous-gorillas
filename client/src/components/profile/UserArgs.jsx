import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';

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
        <form>
          Votes: {this.props.votes}
          {this.props.argument}
        </form>
      </div>
      )
  }
}
export default UserArgs;


