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
      <div>
        <div className="col-md-2 UserImage" >
          <div className="imgHolder">image</div>
        </div>
        <div className="col-md-6 UserInfo">
          <div className="row UserName">
            Your Name
          </div>
          <div className="row UserStats">
            <div className="col-md-2">08/17/2017</div>
            <div className="col-md-1">D4</div>
            <div className="col-md-1">A7</div>
            <div className="col-md-1">M35</div>
          </div>
          <div className="row UserDescription">
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