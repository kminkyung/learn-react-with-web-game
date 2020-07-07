const React = require('react');
const { Component } = React;
const Try = require('./Try');

function getNumbers() {

}

class NumberBaseball extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries: []
    }
  }
  onChangeInput = () => {

  }
  onSubmitForm = () => {

  }
  fruit = [
    ['사과', '맛있다'],
    ['바나나', '맛없다'],
    ['배', '시다'],
    ['귤', '시다'],
    ['감', '떫다'],
    ['포도', '시다']
  ];
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.fruit.map((v, i) => < Try value={v} index={i}/>)}
        </ul>
      </>
    )
  }
}

module.exports = NumberBaseball;