import React from 'react';
import DebateItem from './DebateItem.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


class Landing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='landing'>
        <div className="container">
          <h1 className="title">Moot</h1>
          <h3 className="caption"> All Arguments Accepted </h3>
        </div>
      </div>
    )
  }
}

export default Landing;
