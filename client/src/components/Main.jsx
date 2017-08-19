import React from 'react';
import DebateItem from './DebateItem.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import DebateFloor from './debate/DebateFloor.jsx';
import axios from 'axios';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      debates: [],
      newTopic: '',
      buttonClass: 'bounce',
    };

    this.handleNewTopic = (topic) => {
      this.setState({
        newTopic: topic,
      });
    }

    this.onButtonClick = () => {
      console.log('vote clicked!');
      this.setState({ buttonClass: 'bounce bounceAnimate'});

      setInterval(function() {
        this.setState({ buttonClass: 'bounce'});
      }.bind(this), 10);
    }

    this.newDebate = (topic) => {
      console.log('new debate')
      this.onButtonClick();

      axios.post('http://localhost:3000/debates/api/post', {
        topic: topic,
      }).then((response)=>{
        this.getAllActive();
      }).catch(err=>{
        console.log('create new debate Error:', err);
      });
    };

    this.getAllActive = () => {

      axios.get('http://localhost:3000/debates/api/get')
      .then(response => {
        this.setState({
          debates: response.data.data,
        });
      })
      .catch(err => {
        console.log('[Main] Get debates ERROR:', err);
      })
    }
  }

  componentDidMount() {
    this.getAllActive();
  }

  render() {
    const debateIsSelected = this.props.debateIsSelected;

    if (!debateIsSelected) {
      return (
        <div className ='col-md-6'>
        <h4>List of Debates</h4>
        <div className="newTopic">
            <h5>Create New Topic</h5>
            <form>
              <input type="text" name="topic" onChange={(e)=>{this.handleNewTopic(e.target.value)}} />
              <button className={this.state.buttonClass} onClick={(e)=>{this.newDebate.call(this, this.state.newTopic)}}>Create Topic</button>
            </form>
          </div>
        <ul className='debates'>
        { this.state.debates.map( (debate, i) => <DebateItem debate={debate} key={i} debateSelectHandler={this.props.debateSelectHandler} /> ) }
        </ul>
        <Switch>
        { this.state.debates.map( (debate, i) =>
          <Route path={`debates/${debate.topic.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} component={DebateFloor} key={i} /> ) }
        </Switch>

        </div>

      )

    } else {
      return (
        <div></div>
      )
    }
  }

}

export default Main;
