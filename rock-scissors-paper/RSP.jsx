const React = require('react');
const {PureComponent} = React;

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount -> (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 해당 컴포넌트를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoord = {
  rock: '0',
  scissors: '-256px',
  paper: '-530px'
}
const scores = {
  rock: 0,
  scissors: 1,
  paper: -1
}

const computerChoice = imgCoord => Object.entries(rspCoord).find(v => v[1] === imgCoord)[0];

class RSP extends PureComponent {
  state = {
    result: '',
    score: 0,
    imgCoord: '-256px'
  }

  interval;

  changeHand = () => {
    const {imgCoord} = this.state;
    if (imgCoord === rspCoord.rock) {
      this.setState({
        imgCoord: rspCoord.scissors
      })
    } else if (imgCoord === rspCoord.scissors) {
      this.setState({
        imgCoord: rspCoord.paper
      })
    } else if (imgCoord === rspCoord.paper) {
      this.setState({
        imgCoord: rspCoord.rock
      })
    }
  }

  componentDidMount() { // 컴포넌트가 첫 렌더링 된 후 실행되는 곳, 여기서 비동기 요청을 주로 하는 편
    this.interval = setInterval(this.changeHand, 1000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) { // 리렌더링 후 실행되는 곳
  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전 실행되는 곳, 비동기 요청 정리를 하는 편
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => () => {
    const {imgCoord} = this.state
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: 'Draw',
      })
    } else if ([-1, 2].includes(diff)) {
      this.setState(prevState => {
        return {
          result: 'Win',
          score: prevState.score + 1
        }
      })
    } else {
      this.setState(prevState => {
        return {
          result: 'Lose',
          score: prevState.score - 1
        }
      })
    }
    setTimeout(() => this.interval = setInterval(this.changeHand, 100), 1000);
  }

  render() {
    const {result, score, imgCoord} = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(rock-scissors-paper.jpg) ${imgCoord} 0` }}/>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>Rock</button>
          <button id="scissors" className="btn" onClick={this.onClickBtn('scissors')}>Scissors</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>Paper</button>
        </div>
        <div className="result">{result}</div>
        <div>Score : {score}</div>
      </>
    )
  }
}

module.exports = RSP;