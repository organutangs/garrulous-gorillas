import React from 'react';
import ReactDOM from 'react-dom';
import Argument from './Argument.jsx';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import {sortArgsByVote, sortArgsByNew, sortArgsByHot} from '../../utils.js';
import AddArgForm from './AddArgForm.jsx';
import FilterArgs from './FilterArgs.jsx';

class Position extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arguments: [],
      points: 'Loading...',
      topic: this.props.topic,
      topVoted:[],
      topNew:[],
      topHot:[],
      currentFilter:'Top Voted'

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
      }

      if (data.message.substring(0, 6) === '#agree' && this.props.position==='For') {
        axios.post('http://127.0.0.1:3000/debates/api/postArg', {
          argumentBody: data.message.substring(7),
          topic: this.props.topic,
          side: this.props.position.toLowerCase(),
        })
        .then (response=> {
          this.addArguments(data.message.substring(7));
        })
      }
    });

    this.addArguments = this.addArguments.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.setArguments = this.setArguments.bind(this);
    this.setCurrentFilter = this.setCurrentFilter.bind(this);
  }

  //before component loads, query for data
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
<<<<<<< HEAD
=======
        //console.log("findVOTES HERE ", response.data);
>>>>>>> filter bar completely working, fixed bugs with set interval and filter bar, fixed bug with individual votes created by filter bar, need to fix sort by date util
        let topSortedArgs = sortArgsByVote(args).slice(0, 10);
        let topSortedNew = sortArgsByNew(args).slice(0, 10);
        let topSortedHot= sortArgsByHot(args).slice(0, 10);
        //console.log("mostvotes ", topSortedArgs,"Hot ",topSortedHot,"New ",topSortedNew);
        this.setState({
          arguments: topSortedArgs,
          topHot: topSortedHot,
          topNew: topSortedNew,
          topVoted: topSortedArgs,
          currentFilter: topSortedArgs
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
      let updatedPoints = response.data.data[`points${position}`]
      this.setState({
        points : updatedPoints,
      })
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
          topic: this.state.topic
        }
      })
      .then(response=> {
          let args = response.data.data;
          //args = body, votes, updated, id, debateSide, debateTopic
          let topSortedArgs = sortArgsByVote(args).slice(0, 10);
          let topSortedNew = sortArgsByNew(args).slice(0, 10);
          let topSortedHot= sortArgsByHot(args).slice(0, 10);

          let currentList;
          if (this.state.currentFilter === "Top Voted") {
            currentList = topSortedArgs;
          } else if (this.state.currentFilter === "Hot") {
            currentList = topSortedHot;
          } else {
            currentList = topSortedNew;
          }
          //
          this.setState({
            topHot: topSortedHot,
            topNew: topSortedNew,
            topVoted: topSortedArgs,
            arguments: currentList
          })
        }
      )

      axios.get('http://127.0.0.1:3000/debates/api/getPoints', {
        params: {
          topic: this.state.topic
        }
      })
      .then(response=> {
        let position = this.props.position === 'For' ? 'Pro' : 'Con';
        let updatedPoints = response.data.data[`points${position}`]
        this.setState({
          points : updatedPoints,
        })
      })
      .catch(err=> console.log(err))

    }, 5000);
  }


//this increases the total points (votes)
  handleVote() {
    this.setState({
      points: this.state.points+1
    })
    axios.put('http://127.0.0.1:3000/debates//api/addPtToDebateSide', {
      topic: this.props.topic,
      side: this.props.position.toLowerCase(),
    })
    .then (response=> {
    })
  }

  addArguments(newArg) {
    let newArgsArr = this.state.arguments.slice();
    newArgsArr.push(newArg);
    this.setState({
      arguments: newArgsArr,
    })
  }

  //pass this function into FilterArgs
  //sortArg is an array of arguments sorted by New or Hot or Top
  setArguments(sortArg) {
    //console.log('***this is sort arg***', sortArg);
    this.setState({arguments: sortArg});
  }

  setCurrentFilter(input) {
    this.setState({currentFilter: input});
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

          <AddArgForm topic={this.props.topic} position={this.props.position} addArguments={this.addArguments}/>

          <FilterArgs new={this.state.topNew} hot={this.state.topHot} top={this.state.topVoted} setArguments={this.setArguments} setFilter={this.setCurrentFilter}/>

          {this.state.arguments.map( (argument, index) => <Argument position= {this.props.position} handleVote={this.handleVote} argument={argument.body} votes={argument.votes}/>)
        }
      </div>
    )
  }
}

export default Position;