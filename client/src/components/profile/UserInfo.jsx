import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//will be used to handle changes
  handleChange(event) {
    this.setState({value: event.target.value});
  }
//will be used to edit info
  handleSubmit(event) {
    // event.preventDefault();
    // axios.post('http://127.0.0.1:3000/debates/api/postArg', {
    //     argumentBody: this.state.value,
    //     topic: this.props.topic,
    //     side: this.props.position.toLowerCase(),
    //   })
    //   .then (response=> {
    //     this.props.addArguments(this.state.value);
    //   })
    //   .catch(err=> {
    //     console.log(err);
    //   });

  }

  render() {
    return (
      <div className="infoPadding">
        <div className="col-md-3 UserImage" >
          <div className="imgHolder">
            <img src={this.props.user.img} width="128" height="128"></img>
          </div>
          <div>
            <button>Edit</button>
          </div>
        </div>
        <div className="col-md-9 UserInfo">
          <div className="row UserName">
            Your Name
          </div>
          <div className="row UserStats">
            <div className="col-md-2 date">{this.props.user.createdDate}</div>
            <div className="col-md-1 numD">{this.props.debates.length}</div>
            <div className="col-md-1 numA">{this.props.args.length}</div>
            <div className="col-md-1 numM">{this.props.user.msgs}</div>
          </div>
          <div className="row UserDescription">
            <div className="description">{this.props.user.info}</div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Edit your information:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;