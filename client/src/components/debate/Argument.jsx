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
      voteCount: this.props.votes,
      buttonClass: 'drift bounce'
    }
    this.handleVote=this.handleVote.bind(this)
  }

  onButtonClick() {
    console.log('vote clicked!');
    this.setState({ buttonClass: 'drift bounce bounceAnimate'});
    setInterval(function() {
      this.setState({ buttonClass: 'drift bounce'});
    }.bind(this), 100)
  }

  //this increases the arguments votes
  handleVote() {
    console.log('button click')
    this.onButtonClick();
    if (!this.state.voted) {
    this.setState({
      voted: !this.state.voted,
      status: 'Received'
    })
    this.props.handleVote();

    axios.put('http://127.0.0.1:3000/debates/api/addVoteToArgument', {
      argument: this.props.argument
    })
    .then((response)=> {
      this.setState({points: response.data.data.votes});
      this.setState({voteCount: this.props.votes + 1});
    })
    .catch((err)=> {
      console.log("error adding vote to arg", err);
    });
    }
  }

  componentWillMount() {

  }

  render() {
    let buttonTemplate = null;
    if (localStorage.position === this.props.position.toLowerCase() || !localStorage.position) {
      buttonTemplate = <Button onClick={this.handleVote} className={this.state.buttonClass}>
            {this.state.status}
          </Button>
    }
    return(
      <div>
        <form>{buttonTemplate}
          Votes: {this.state.voteCount}
          {this.props.argument}
        </form>
      </div>
      )
  }
}
export default Argument;


