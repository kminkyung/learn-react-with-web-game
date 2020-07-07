const React = require('react');
const { Component } = React;

class WordChain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '시작',
      value: '',
      result: ''
    }
  }
  onRefInput = (c) => {
    this.input = c;
  }
  onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        word: this.state.value,
        value: '',
        result: 'Right!'
      })
      this.input.focus();
    } else {
      this.setState({
        word: this.state.word,
        value: '',
        result: 'Wrong!'
      })
      this.input.focus();
    }
  }
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
          <button>Click</button>
        </form>
        <div>{this.state.result}</div>
      </>
    )
  }
}

module.exports = WordChain;