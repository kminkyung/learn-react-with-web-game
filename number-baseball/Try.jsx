const React = require('react');
const { Component } = React;

class Try extends Component {
  render() {
    return (
      <li key={this.props.index}>
        <b>{this.props.value[0]}</b> - {this.props.value[1]}
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </li>
    )
  }
}

module.exports = Try;