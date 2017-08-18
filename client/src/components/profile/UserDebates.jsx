import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';

class UserDebates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false,
      status: 'Vote Here',
    }
  }
// Votes: {this.props.votes}
//           {this.props.argument}
  componentWillMount() {

  }

  render() {
    return(
      <div>
        <form>
          Debate list
        </form>
      </div>
      )
  }
}
export default UserDebates;
