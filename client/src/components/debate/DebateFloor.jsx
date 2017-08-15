import React from 'react';
import ReactDOM from 'react-dom';
import Position from './Position.jsx';
import axios from 'axios';
import ChatView from '../chatview/chatview.jsx';
import ForView from '../chatview/forview.jsx';
import AgainstView from '../chatview/againstview.jsx';


class DebateFloor extends React.Component {
  constructor(props) {
    super(props);
    // ToDo: now that we passed in currentDebate in debatefloor, write the logic in DebateFloor.jsx to show the debate info
    // CurrentDebate is accessible at this.props.currentDebate
    this.state = {
      showJoinButton: true,
      // These should be populated by the DB, or sockets for each specific debate
      topic: this.props.currentDebateSelected.topic,
      winner: "",  
    }
  }

  componentWillMount() {

    
  }
  componentDidMount() {
 
  }

  setToken(position) {
    if (position==='for') {
      localStorage.setItem('position', 'for')
    }  else {
      localStorage.setItem('position', 'against')
    }
    this.setState({
      showJoinButton: false,
    })
    console.log(position)
    console.log('token set');
    this.forceUpdate();
  }


  // add new arguments
  addArguments(newArg) {
    let newArgsArr = this.state.arguments.slice();
    newArgsArr.push(newArg);
    this.setState({
      arguments: newArgsArr,
    })
  }

  render() {
    const debateIsSelected = this.props.debateIsSelected;

    if (debateIsSelected) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3"><h2>{this.props.currentDebateSelected.topic}</h2></div>
        </div>
          <div className="row">
            <Position position="For" 
                      setToken={this.setToken.bind(this, 'for')} 
                      showJoinButton={this.state.showJoinButton}
                      // change to props later
                      topic={this.state.topic} />
            <Position position="Against" 
                      setToken={this.setToken.bind(this, 'against')} 
                      showJoinButton={this.state.showJoinButton}
                      // change to props later
                      topic={this.state.topic} />
          </div>
          <div className='row' >
            { localStorage.position === 'for' ? <ForView /> : null}
            { localStorage.position === 'against' ? <AgainstView /> : null}
            { localStorage.position ? null : <ChatView />}
          </div>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

export default DebateFloor;
