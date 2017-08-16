import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { Route, Redirect } from 'react-router'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      errorMessage: ''
    };
    
    this.handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ errorMessage: '' });
      
      const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
      const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
      const creds = { username: username, password: password };
      //this.props.onLoginClick(creds)

      axios.post('http://localhost:3000/users/register', creds)
      .then(response => {
        console.log('[Signup] Success Response', response);
        ReactDOM.findDOMNode(this.refs.username).value = '';
        ReactDOM.findDOMNode(this.refs.password).value = '';
        this.setState({ errorMessage: '' });
        this.setState({ errorMessage: response.data.msg });
        
        axios.post('http://localhost:3000/users/login', creds)
        .then(response => {
          localStorage.clear();
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('user_id', response.data.user_id);
          this.setState({ errorMessage: response.data.msg });
          this.setState({ redirect: true});
        })
        .catch(error => {
          console.log('[Login] ERROR:', error);
          this.setState({ errorMessage: error.response.data.msg });
        });
      })
      .catch(error => {
        console.log('[Signup] ERROR:', error);
        this.setState({ errorMessage: error.response.data.msg });
      });
    };
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to='/debates'/>;
    };
    return (
      <div>
        <h1>Create a New Account</h1>
        <Form inline onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalEmail">
                <ControlLabel>Username </ControlLabel>
                <FormControl required type="username" ref="username" onChange={this.handleChange} placeholder="username" />
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password </ControlLabel>
                <FormControl required type="password" ref="password" onChange={this.handleChange} placeholder="password" />
            </FormGroup>
            <Button type="submit" onClick={this.handleSubmit}>Sign Up</Button>
            {this.state.errorMessage &&
              <p style={{color:'red'}}>{this.state.errorMessage}</p>
            }
        </Form>
      </div>
    )
  }
}

export default SignUp;