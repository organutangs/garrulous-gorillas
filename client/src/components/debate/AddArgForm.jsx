import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AddArgForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

//add user
//everytime a vote is triggered add username to vote (already made)
//if already voted, dont let them vote from the already made boolean
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

    axios.post('/api/addArgToUser', {
      argumentBody: this.state.value,
      topic: this.props.topic,
      side: this.props.position.toLowerCase(),
      user: localStorage.username
    })
    .then (response => {
      console.log("This is response  ", response);
      //pass response up ;
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
        <input type="submit" value="Submit" className="drift wiggle" />
      </form>
    );
  }
}

export default AddArgForm;