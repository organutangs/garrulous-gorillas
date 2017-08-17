import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//will be used to handle changes
  handleChange(event) {
    this.setState({value: event.target.value});
  }
//will be used to edit info
  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://127.0.0.1:3000/debates/api/postArg', {
        argumentBody: this.state.value,
        topic: this.props.topic,
        side: this.props.position.toLowerCase(),
      })
      .then (response=> {
        this.props.addArguments(this.state.value);
      })
      .catch(err=> {
        console.log(err);
      });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter new argument:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UserInfo;