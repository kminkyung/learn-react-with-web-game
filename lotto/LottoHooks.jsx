const React = require('react');
const {useState, useEffect, useRef, memo} = React;
const Ball = require('./Ball');

const getWinNumbers = () => {
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

const Lotto = memo(() => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const runTimeouts = () => {
    console.log('runTimeouts');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevState => [...prevState, winNumbers[i]])
      }, (i + 1) * 1000)
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000)
  }

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }

  useEffect(() => {
    if(!winBalls.length) runTimeouts();

    return () => {
     // return timeouts.current.forEach(v => clearTimeout(v));
    }
  }, [timeouts.current]) // [] 빈배열이면 componentDidMount와 같음
  //배열에 요소가 있으면 componentDidMount랑 componentDidUpate 둘 다 수행

  return (
    <>
      <div>Lotto Numbers</div>
      <div id="result">
        {winBalls.map(v => <Ball key={v} number={v}/>)}
      </div>
      <div>Bonus!</div>
      {bonus && <Ball number={bonus}/>}
      {redo && <button onClick={onClickRedo}>Try Again</button>}
    </>
  )
})


module.exports = Lotto;