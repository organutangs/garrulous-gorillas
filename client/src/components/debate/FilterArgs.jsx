import React from 'react';
import ReactDOM from 'react-dom';

class FilterArgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  //when a dropdown is selected i need it to invoke
  // this.props.setArguments(this.prop.hot)
  render() {
    return (
      <div class="ui dropdown">
        <input type="hidden" name="Filter Arguments By: "/>
        <i class="dropdown icon"></i>
        <div class="default text">Top Voted</div>
        <div class="menu">
          <div class="item" data-value="TopVoted">Top Voted</div>
          <div class="item" data-value="New">New</div>
          <div class="item" data-value="Hot">Hot</div>
        </div>
      </div>

    );
  }
}
export default FilterArgs;