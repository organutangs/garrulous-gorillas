import React from 'react';
import ReactDOM from 'react-dom';

class FilterArgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "defaulted to top"};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.setFilter(event.target.value);

    if (event.target.value === "Top Voted") {
      this.props.setArguments(this.props.top);
    } else if (event.target.value === "Hot") {
      this.props.setArguments(this.props.hot);
    } else {
      this.props.setArguments(this.props.new);
    }
  }

  render() {
    return (
        <div>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Top Voted" list="1">Top Voted</option>
            <option value="Hot" list="2"> Hot </option>
            <option value="New" list="3"> New </option>
          </select>
        </div>

    );
  }
}
export default FilterArgs;