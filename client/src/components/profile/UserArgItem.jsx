import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';

class ArgItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false,
      status: 'Vote Here',
      voteCount: this.props.votes
    }
    // this.handleVote=this.handleVote.bind(this)
  }

  //this increases the arguments votes
  // handleVote() {
  //   console.log("argvote is being triggered***", this.props.votes);
  //   if (!this.state.voted) {
  //   this.setState({
  //     voted: !this.state.voted,
  //     status: 'Received'
  //   })
  //   this.props.handleVote();

  //   axios.put('http://127.0.0.1:3000/debates/api/addVoteToArgument', {
  //     argument: this.props.argument
  //   })
  //   .then((response)=> {
  //     console.log("success called axios to vote"), response;
  //     this.setState({points: response.data.data.votes});
  //     this.setState({voteCount: this.props.votes + 1});
  //   })
  //   .catch((err)=> {
  //     console.log("error adding vote to arg", err);
  //   });
  //   }
  // }

  componentWillMount() {

  }

  render() {
    return(
      <div className="argItem boxStandard">
        <div>
          <div className="row">{this.props.arg.body}</div>
          <div className="row">
            <div className="debateTopic">{this.props.arg.debateTopic}</div> 
          </div>
          <div className="row">
            <div className="col-md-2">{this.props.arg.updated}</div>
            <div className="col-md-2">Votes: {this.props.arg.votes}</div>
            <div className="col-md-2">{this.props.arg.debateSide}</div>
          </div>
        </div>
      </div>
      )
  }
}

export default ArgItem;


