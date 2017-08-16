//debate chat
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup, Collapse } from 'react-bootstrap';

const socket = require('socket.io-client')('http://localhost:3000/for');

export default class Forview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chat: {},
      open: 0,
      displayCustom: {display: 'table'},
    }
    this.toggleDisplay = ()=>{
      console.log('display state', this.state.displayCustom.display);
      if( this.state.displayCustom.display==='none'){
      this.setState({
        displayCustom: {display: 'table'}
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
        side: 'for'
      });
    };
    // Listen for chats
    socket.on('chat', (data) => {
      const output = ReactDOM.findDOMNode(this.refs.outputFor);
      output.innerHTML += `<p><strong>${data.username}:</strong>${data.message}</p>`;
      output.lastChild.scrollIntoView();
    });
  }

 render () {
  

  return (
      <div className="container for">
        <h3>Side: For</h3>
        <div className="row">
            <div className="col-md-5">
                <div className="panel panel-primary">
                    <div className="panel-heading" id="accordion">
                        <span className="glyphicon glyphicon-comment"></span> For
                          <div className="btn-group pull-right">
                            <a type="button" className="btn btn-default btn-xs" onClick={this.toggleDisplay.bind(this)}>
                                <span className="glyphicon glyphicon-chevron-down"></span>
                            </a>
                          </div>
                    </div>
                    <Collapse in={this.state.open} >
                      <div className="panel-collapse collapse in" id="collapse1" style={this.state.displayCustom}>
                        <div className="panel-body">
                          <div id="chat-window-output" ref="outputFor"></div>
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
                              <input onSubmit={(event) => this.handleSubmit(event)} id="btn-input" type="text" className="inputMessage form-control input-sm" ref="message" placeholder="Type your message here..." />
                              <span className="input-group-btn">
                                  <input type="submit" className="btn btn-warning btn-sm" id="btn-chat" onClick={(event) => this.handleSubmit(event)} value="send" />
                              </span>
                          </div>
                        </div> 
                      </div>
                    </Collapse> 
                </div>
            </div>      
        </div>
      </div>     
      )
   }
}