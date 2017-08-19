import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Nav from './components/Nav.jsx';
import Main from './components/Main.jsx';
import DebateFloor from './components/debate/DebateFloor.jsx';
import Login from './components/login/login.jsx';
import SignUp from './components/signup/signup.jsx';
import Landing from './components/Landing.jsx';
import Profile from './components/Profile.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDebateSelected: {},
      debateIsSelected: false
    }

    this.debateSelectHandler = (debateSelected) => {
      // When a debate is clicked, App will be notified and get the current debate data
      // Save in state
      this.setState({currentDebateSelected: debateSelected});
      this.setState({debateIsSelected: true});
    }

    this.debateSelectHandler.bind(this);
  }

  componentDidMount() {

    // query database for points and pass to positions

  }

  render() {

    return (
      <div>
        <Nav />

        <Switch>
          {/*<Route exact path="/" component={Landing}/>*/}
          <Route exact path="/" component={ () => <Main debateSelectHandler={this.debateSelectHandler} debateIsSelected={this.debateIsSelected} currentDebate={this.state.currentDebate}/> }/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route path="/debates" component= { ()=> <DebateFloor currentDebateSelected={this.state.currentDebateSelected} debateIsSelected={this.state.debateIsSelected}/> } />
          <Route exact path="/home" component={Profile}/>
        </Switch>
      </div>)
  }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
  ), document.getElementById('app'));

