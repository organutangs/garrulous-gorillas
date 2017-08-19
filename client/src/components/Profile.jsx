import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import DebateItem from './DebateItem.jsx';
import UserInfo from './profile/UserInfo.jsx';
import UserArgs from './profile/UserArgs.jsx';
import UserVotes from './profile/UserVotes.jsx';
import UserDebates from './profile/UserDebates.jsx';
//may just have a button to filter for arguments and debates that a user created
//need to have argument information: look at the functions and files inside of the debate folder
//need to have debate list information
class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      user: {img: 'https://pbs.twimg.com/profile_images/680269671073988608/9seMbtxC.jpg', name: 'Luke Skywalker', createdDate: '07/17/2017', msgs:'25', info: 'Raised on a small farm on Tatooine, Luke had a simple life until the day he bought some droids to work as helpers. This event set him on the path to become one of the greatest Jedis in the galaxy and to play a key part in the toppling of the Empire.'},
      debates: [
        {
          updated: '08/17/2017',
          topic: 'Trump\'s Hair',
          winner: 'against',
          pointsFor: 62,
          pointsAgainst: 9000,
        },
        {
          updated: '08/17/2017',
          topic: 'Trump\'s Hair',
          winner: 'against',
          pointsFor: 62,
          pointsAgainst: 9000,
        },
        {
          updated: '08/17/2017',
          topic: 'Trump\'s Hair',
          winner: 'against',
          pointsFor: 62,
          pointsAgainst: 9000,
        },
        {
          updated: '08/17/2017',
          topic: 'Trump\'s Hair',
          winner: 'against',
          pointsFor: 62,
          pointsAgainst: 9000,
        },
      ],
      args: [
        {
          updated: '08/17/2017',
          body: 'orange hair',
          votes: 75,
          debateTopic: 'Trump\'s Hair',
          debateSide: 'against',
          user: 'Padme',
          activeDebate: false,
        },
        {
          updated: '08/17/2017',
          body: 'orange hair',
          votes: 75,
          debateTopic: 'Trump\'s Hair',
          debateSide: 'against',
          user: 'Padme',
          activeDebate: false,
        },
        {
          updated: '08/17/2017',
          body: 'orange hair',
          votes: 75,
          debateTopic: 'Trump\'s Hair',
          debateSide: 'against',
          user: 'Padme',
          activeDebate: false,
        },
        {
          updated: '08/17/2017',
          body: 'orange hair',
          votes: 75,
          debateTopic: 'Trump\'s Hair',
          debateSide: 'against',
          user: 'Padme',
          activeDebate: false,
        },
        {
          updated: '08/17/2017',
          body: 'orange hair',
          votes: 75,
          debateTopic: 'Trump\'s Hair',
          debateSide: 'against',
          user: 'Padme',
          activeDebate: false,
        },
      ],

    };
  }


  // componentWillMount() {

  //   axios.get('http://127.0.0.1:3000/debates/api/getArgs', {
  //     params: {
  //       // CHnage this hard code
  //       user: localStorage.username;
  //     }
  //   })
  //   .then(response=> {
  //       let args = response.data.data;
  //       let topSortedArgs = sortArgsByVote(args).slice(0, 10);
  //       let topSortedNew = sortArgsByNew(args).slice(0, 10);
  //       let topSortedHot= sortArgsByHot(args).slice(0, 10);
  //       //console.log("mostvotes ", topSortedArgs,"Hot ",topSortedHot,"New ",topSortedNew);
  //       this.setState({
  //         args: args,
  //         topHot: topSortedHot,
  //         topNew: topSortedNew,
  //         topVoted: topSortedArgs,
  //         currentFilter: topSortedArgs
  //       })
  //     }
  //   )

  //   axios.get('http://127.0.0.1:3000/debates/api/getPoints', {
  //     params: {
  //       // Change this hard code
  //       user: localStorage.username;
  //     }
  //   })
  //   .then(response=> {
  //     let position = this.props.position === 'For' ? 'Pro' : 'Con';
  //     let updatedPoints = response.data.data[`points${position}`]
  //     this.setState({
  //       debates: response.data.data
  //       points : updatedPoints,
  //     })
  //   })
  //   .catch(err=> console.log(err))
  // }

  // componentDidMount() {
  //   // Query Database using set interval and axios for the amount of votes, and arguments

  //   // Query DB for all args from this debate topic and this position
  //   // Set to state, arguments
  //   // position = this.props.position
  //   // {this.state.positions.map((position, index) => <Position handleVote={this.handleVote} key={index} position={position} />)}
  //   this.intervalId = setInterval(()=> {
  //     axios.get('http://127.0.0.1:3000/debates/api/getArgs', {
  //       params: {
  //         user: localStorage.username
  //       }
  //     })
  //     .then(response=> {
  //         let args = response.data.data;
  //         //args = body, votes, updated, id, debateSide, debateTopic
  //         let topSortedArgs = sortArgsByVote(args).slice(0, 10);
  //         let topSortedNew = sortArgsByNew(args).slice(0, 10);
  //         let topSortedHot= sortArgsByHot(args).slice(0, 10);

  //         let currentList;
  //         if (this.state.currentFilter === "Top Voted") {
  //           currentList = topSortedArgs;
  //         } else if (this.state.currentFilter === "Hot") {
  //           currentList = topSortedHot;
  //         } else {
  //           currentList = topSortedNew;
  //         }
  //         //
  //         this.setState({
  //           topHot: topSortedHot,
  //           topNew: topSortedNew,
  //           topVoted: topSortedArgs,
  //           arguments: currentList
  //         })
  //       }
  //     )

  //     axios.get('http://127.0.0.1:3000/debates/api/getPoints', {
  //       params: {
  //         topic: this.state.topic
  //       }
  //     })
  //     .then(response=> {
  //       let position = this.props.position === 'For' ? 'Pro' : 'Con';
  //       let updatedPoints = response.data.data[`points${position}`]
  //       this.setState({
  //         points : updatedPoints,
  //       })
  //     })
  //     .catch(err=> console.log(err))

  //   }, 5000);
  // }

  render() {
    return (
      <div className="profile">
        <div className="container">
          <div className="row col-md-9" id="userInfo">
            <UserInfo
              user={this.state.user}
              debates={this.state.debates}
              args={this.state.args}
            />
          </div>
          <div className="row" id="Activity">
            <div className="activityContainer">
              <div className="col-md-6" id="userDebates">
                <UserDebates debates={this.state.debates} />
              </div>
              <div className="col-md-6" id="userArguments">
                <UserArgs args={this.state.args} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
