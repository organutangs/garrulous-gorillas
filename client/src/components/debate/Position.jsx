import React from 'react';
import ReactDOM from 'react-dom';
import Argument from './Argument.jsx';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import {sortArgsByVote} from '../../utils.js'




class Position extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arguments: [],
      points: 'Loading...',
      topic: this.props.topic,
    }

    const socket = require('socket.io-client')(`http://localhost:3000/${this.props.position.toLowerCase()}`)

    socket.on('chat', (data) => {
      if (data.message.substring(0, 9) === '#disagree' && this.props.position==='Against') {
      axios.post('http://127.0.0.1:3000/debates/api/postArg', {
        argumentBody: data.message.substring(10),
        topic: this.props.topic,
        side: this.props.position.toLowerCase(),
      })
      .then (response=> {
        this.addArguments(data.message.substring(10));
      })
      console.log('#disagree called')
      }  

      if (data.message.substring(0, 6) === '#agree' && this.props.position==='For') {
        axios.post('http://127.0.0.1:3000/debates/api/postArg', {
          argumentBody: data.message.substring(7),
          topic: this.props.topic,
          side: this.props.position.toLowerCase(),
        })
        .then (response=> {
          this.addArguments(data.message.substring(7));
          console.log('agree arg posted', response)
        })
      }  
    });

    this.addArguments = this.addArguments.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentWillMount() {

    axios.get('http://127.0.0.1:3000/debates/api/getArgs', {
      params: {
        side: this.props.position.toLowerCase(),
        // CHnage this hard code
        topic: this.state.topic
      }
    })
    .then(response=> {
        let args = response.data.data;
        let topSortedArgs = sortArgsByVote(args).slice(0, 10);
        this.setState({
          arguments: topSortedArgs
        })
      }
    )

    axios.get('http://127.0.0.1:3000/debates/api/getPoints', {
      params: {
        // Change this hard code
        topic: this.state.topic
      }
    })
    .then(response=> {
      let position = this.props.position === 'For' ? 'Pro' : 'Con';
      console.log('position', position);
      let updatedPoints = response.data.data[`points${position}`]
      console.log('updated pointssss', updatedPoints);
      this.setState({
        points : updatedPoints,
      })
      console.log('GOT ALL POINTS >>>>>>>', response.data.data)
    })
    .catch(err=> console.log(err))
  }

  componentDidMount() {
    // Query Database using set interval and axios for the amount of votes, and arguments

    // Query DB for all args from this debate topic and this position
    // Set to state, arguments
    // position = this.props.position
    // {this.state.positions.map((position, index) => <Position handleVote={this.handleVote} key={index} position={position} />)}
    this.intervalId = setInterval(()=> {
      axios.get('http://127.0.0.1:3000/debates/api/getArgs', {
        params: {
          side: this.props.position.toLowerCase(),
          // CHnage this hard code
          topic: this.state.topic
        }
      })
      .then(response=> {
          let args = response.data.data;
          let topSortedArgs = sortArgsByVote(args).slice(0, 10);
          this.setState({
            arguments: topSortedArgs
          })
        }
      )

      axios.get('http://127.0.0.1:3000/debates/api/getPoints', {
        params: {
          // Change this hard code
          topic: this.state.topic
        }
      })
      .then(response=> {
        let position = this.props.position === 'For' ? 'Pro' : 'Con';
        console.log('position', position);
        let updatedPoints = response.data.data[`points${position}`]
        console.log('updated pointssss', updatedPoints);
        this.setState({
          points : updatedPoints,
        })
        console.log('GOT ALL POINTS >>>>>>>', response.data.data)
      })
      .catch(err=> console.log(err)) 
    }, 5000);
  }



  handleVote() {
    this.setState({
      points: this.state.points+1
    })
    axios.put('http://127.0.0.1:3000/debates//api/addPtToDebateSide', {
      topic: this.props.topic,
      side: this.props.position.toLowerCase(),
    })
    .then (response=> {
      console.log('Vote receieved by Database')
    })
    console.log('voted');
  }

  addArguments(newArg) {
    let newArgsArr = this.state.arguments.slice();
    newArgsArr.push(newArg);
    this.setState({
      arguments: newArgsArr,
    })
    console.log('added argument', this.state.arguments);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className='col-sm-6'>
          <h3>{this.props.position}</h3>
          <div><h4>{this.state.points} Points</h4></div>
        {this.props.showJoinButton ? <Button onClick={this.props.setToken} bsStyle="success">Join</Button> : null}
        
        {this.state.arguments.map( (argument, index) => <Argument position= {this.props.position} handleVote={this.handleVote} argument={argument} />)}
      </div>
    )
  }
}

export default Position;