//debate chat
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
const socket = require('socket.io-client')('http://localhost:3000/spectator');

export default class Chatview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chat: {},
      displayCustom: {display: 'block'},
    }

    this.toggleDisplay = ()=>{
      console.log('display state', this.state.displayCustom.display);
      if( this.state.displayCustom.display==='none'){
        this.setState({
          displayCustom: {display: 'block'}
          });
      } else {
          this.setState({
            displayCustom: {display: 'none'}
          });
      }
    }

    this.handleSubmit = (event) => {
      const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
      const message = ReactDOM.findDOMNode(this.refs.message).value.trim();
      // console.log('Send message');
      // console.log('username', username);
      // console.log('message', message);
      socket.emit('chat', {
        username: username,
        message: message,
        side: 'spectator'
      });
    };
    
    // Listen for chats
    socket.on('chat', (data) => {
      const output = ReactDOM.findDOMNode(this.refs.outputSpectator);
      console.log(output);
      output.innerHTML += `<p><strong>${data.username}:</strong>${data.message}</p>`;
      output.lastChild.scrollIntoView();
    });
  }

 render() {
    return (
      <div className="container spectator">
        <div className="row">
          <div className="col-md-5">
            <div className="panel panel-primary">
              <div className="panel-heading" id="accordion">
                <span className="glyphicon glyphicon-comment"></span> Spectator
                <div className="btn-group pull-right">
                  <a type="button" className="btn btn-default btn-xs" onClick={this.toggleDisplay.bind(this)}>
                    <span className="glyphicon glyphicon-chevron-down"></span>
                  </a>
                </div>
              </div>
              <div className="panel-collapse collapse in" id="collapse1" style={this.state.displayCustom}>
                <div className="panel-body">
                  <div id="chat-window-output" ref="outputSpectator"></div>
                </div>
                <ul className="pages">
                  <li className="chat page">
                    <div className="chatArea">
                      <ul className="messages"></ul>
                    </div>
                  </li>
                  <li className="login page">
                    <div className="form">
                      <h5 className="title">What's your nickname?</h5>
                      <input className="usernameInput" ref="username" type="text" maxLength="14" />
                    </div>
                  </li>
                </ul>
                <div className="panel-footer">
                  <div className="input-group">
                    <input id="btn-input" type="text" className="inputMessage form-control input-sm" ref="message" placeholder="Type your message here..." />
                    <span className="input-group-btn">
                      <button className="btn btn-warning btn-sm" id="btn-chat" onClick={(event) => this.handleSubmit(event)}>Send</button>
                    </span>
                  </div>
                </div> 
              </div> 
            </div>
          </div>      
        </div>
      </div>   
    )
 }
}
