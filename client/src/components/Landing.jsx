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
          <h1 className="text-center">Moot</h1>
          <div className='col-sm-12 row'>
            <div className='col-sm-4'>
              <h1>Foreign Policy</h1>
            </div>
            <div className='col-sm-4'>
              <h1>Law</h1>
            </div>
            <div className='col-sm-4'>
              <h1>Human Rights</h1>
            </div>
          </div>
          <div className='col-sm-12 row'>
            <div className='col-sm-4'>
              <h1>Finance</h1>
            </div>
            <div className='col-sm-4'>
              <h1>Education</h1>
            </div>
            <div className='col-sm-4'>
              <h1>Climate Change</h1>
            </div>
          </div>
          <div className='col-sm-12 row'>
            <div className='col-sm-4'>
              <h1>Gun Control</h1>
            </div>
            <div className='col-sm-4'>
              <h1>Fake News</h1>
            </div>
            <div className='col-sm-4'>
              <h1>Marijuana</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
