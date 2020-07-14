const React = require('react');
const {PureComponent, createRef} = React;
const Try = require('./Try');

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [...Array(4)];
  return arr.map((v, i) => candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
}

class NumberBaseball extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: '숫자야구',
      value: '',
      answer: getNumbers(),
      tries: []
    }
    // this.onChangeInput().this.bind(this); 화살표 함수를 쓰지 않으려면 넣어주어야 함
  }

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  inputRef = createRef(); // this.inputRef 생성

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) { // 정답
      this.setState({
        result: 'Home run!',
        tries: [...this.state.tries, {try: this.state.value, result: 'Home run!'}]
      })
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: []
      })
      this.inputRef.current.focus();
    } else { // 오답
      const answerArray = this.state.value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (this.state.tries.length >= 10) { // 오답 10번
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.answer.join('')}였습니다!`
        })
        alert('성공! 게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: []
        })
        this.inputRef.current.focus();
      } else { // 다시 기회
        this.state.answer.forEach((answer, i) => {
          if (answerArray[i] === answer) {
            strike++;
          } else if (answerArray.includes(answer)) {
            ball++;
          }
        })
        this.setState({
          value: '',
          tries: [...this.state.tries, {try: this.state.value, result: ` : ${strike} 스트라이크, ${ball} 볼입니다.`}]
        })
        this.inputRef.current.focus();
      }
    }
  }


  render() { // render는 Component가 처리해주므로 화살표 함수 쓸 필요 없음
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
          <button type='submit'>시도</button>
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => < Try key={i} tryInfo={v}/>)}
        </ul>
      </>
    )
  }
}

module.exports = NumberBaseball;