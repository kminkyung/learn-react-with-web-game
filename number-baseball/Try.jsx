const React = require('react');
const { Component } = React;

class Try extends Component {
  render(props) {
    return (
      <li>
        <b>{this.props.tryInfo.try}</b>
        <b>{this.props.tryInfo.result}</b>
      </li>
    )
  }
}

module.exports = Try;