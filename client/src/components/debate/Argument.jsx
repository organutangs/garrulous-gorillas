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
      argumentClass: 'slide',
      voteClass: 'wiggleStatic'
    }
    this.handleVote=this.handleVote.bind(this);

    // if ((this.state.buttonClass).includes('bounceAnimate'))
  }

  onButtonClick() {
    console.log('vote clicked!');
    this.setState({ buttonClass: 'bounce bounceAnimate', argumentClass: 'slide slideAnimate', voteClass: 'wiggleStatic wiggleAnimate' });

    setInterval(function() {
      this.setState({ buttonClass: 'bounce'});
    }.bind(this), 200);

    setInterval(function() {
      this.setState({ argumentClass: 'slide', voteClass: 'wiggleStatic' })
    }.bind(this), 350)
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
    let voteStatus = null;
    if (localStorage.position === this.props.position.toLowerCase() || !localStorage.position) {
      if (this.state.status === 'Vote Here') {
        voteStatus = <Button onClick={this.handleVote}>
          {this.state.status}
        </Button>
      } else {
        voteStatus = <p className="voted">Voted!</p>
      }

    }
    return(
      <div>
        <form>
          <p className={this.state.argumentClass}>{this.props.argument}</p>
          <table>
            <tr>
              <td>{voteStatus}</td>
              <td className={this.state.voteClass}>Votes: {this.props.votes}</td>
            </tr>
          </table>
        </form>
      </div>
      )
  }
}
export default Argument;


