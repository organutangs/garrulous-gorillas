import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';

class Argument extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false,
      status: 'Vote Here',
    }

    this.handleVote=this.handleVote.bind(this)
  }  

  handleVote() {
    if (!this.state.voted) {
    this.setState({
      voted: !this.state.voted,
      status: 'Received'
    })
    this.props.handleVote();

    axios.put('http://127.0.0.1:3000/debates/api/addVoteToArgument', {
      argument: this.props.argument
    })
    .then(response)
    }
  }

  render() {
    let buttonTemplate = null;
    if (localStorage.position === this.props.position.toLowerCase() || !localStorage.position) {
      buttonTemplate = <Button onClick={this.handleVote}>
            {this.state.status}
          </Button>
    }
    return(
      <div>
        <form>{buttonTemplate}
          {this.props.argument}
        </form>
      </div>
      )
  }
}
export default Argument;


