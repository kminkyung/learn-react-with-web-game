const React = require('react');
const {useState, useRef, useEffect} = React;

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

const RSP = () => {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoord.scissors);
  let interval = useRef();

  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    interval.current = setTimeout(changeHand, 100)
    return () => { // componentWillUnmount 역할
      // clearInterval(interval.current);
    }
  }, [imgCoord])
  const changeHand = () => {
    if (imgCoord === rspCoord.rock) {
      setImgCoord(rspCoord.scissors)
    } else if (imgCoord === rspCoord.scissors) {
      setImgCoord(rspCoord.paper)
    } else if (imgCoord === rspCoord.paper) {
      setImgCoord(rspCoord.rock)
    }
  }

  const onClickBtn = (choice) => () => {
    clearInterval(interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('Draw');
    } else if ([-1, 2].includes(diff)) {
      setResult('Win');
      setScore(prevScore => prevScore + 1)
    } else {
      setResult('Lose');
      setScore(prevScore => prevScore - 1)
    }
    setTimeout(() => interval = setInterval(changeHand, 100), 1000);
  }

  return (
    <>
      <div id="computer" style={{background: `url(rock-scissors-paper.jpg) ${imgCoord} 0`}}/>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>Rock</button>
        <button id="scissors" className="btn" onClick={onClickBtn('scissors')}>Scissors</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>Paper</button>
      </div>
      <div className="result">{result}</div>
      <div>Score : {score}</div>
    </>
  )
}

module.exports = RSP;