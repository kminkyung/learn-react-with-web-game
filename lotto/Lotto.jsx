const React = require('react');
const {PureComponent} = React;
const Ball = require('./Ball')

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  // const candidate = [...Array(45)].map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumbers, bonusNumber];
}

class Lotto extends PureComponent {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false
  };

  timeouts = [];

  runTimeouts = () => {
    const {winNumbers} = this.state
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          }
        })
      }, (i + 1) * 1000)
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true
      })
    }, 7000)
  }

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.winBalls.length) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v, i) => clearTimeout(v));
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    })
    this.timeouts = [];
  }

  render() {
    const {winBalls, bonus, redo} = this.state;
    return (
      <>
        <div>Lotto Numbers</div>
        <div id="result">
          {winBalls.map(v => <Ball key={v} number={v}/>)}
        </div>
        <div>Bonus!</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={this.onClickRedo}>Try Again</button>}
      </>
    )
  }
}

module.exports = Lotto;