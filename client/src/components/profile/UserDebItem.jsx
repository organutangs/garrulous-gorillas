import React from 'react';
import {
  Link
} from 'react-router-dom';

class UserDebItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  componentWillMount() {

  }

  render() {
  return(
      <div className="debItem">
        <div>
          <div className="row debateTopic">{this.props.debate.topic}</div>
          <div className="row ">
            <div className="debateWinner">{this.props.debate.winner}</div> 
          </div>
          <div className="row">
            <div className="col-md-2">{this.props.debate.updated}</div>
            <div className="col-md-2">Votes: {this.props.debate.pointsFor}</div>
            <div className="col-md-2">{this.props.debate.pointsAgainst}</div>
          </div>
        </div>
      </div>
      )
	}
}

export default UserDebItem;


