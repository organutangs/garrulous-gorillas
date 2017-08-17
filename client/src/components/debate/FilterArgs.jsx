import React from 'react';
import ReactDOM from 'react-dom';

class FilterArgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: []};

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("top PROP HELP** ", this.props.top);
    console.log("NEW PROP HELP** ", this.props.new);
    console.log("HOT PROP HELP** ", this.props.hot);
    console.log("this is EVENT*** ", event.target.value);
    this.setState({value: event.target.value});
    this.props.setArguments(JSON.parse(event.target.value));

  }

  // handleSubmit(event) {
  //   event.preventDefault;
  //   console.log(event);
  //   this.props.setArguments(this.state.value);
  // }
  render() {
    return (
        <div>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value={JSON.stringify(this.props.top)}>Top Voted</option>
            <option value={JSON.stringify(this.props.hot)}> Hot </option>
            <option value={JSON.stringify(this.props.new)}> New </option>
          </select>
        </div>

    );
  }
}
export default FilterArgs;