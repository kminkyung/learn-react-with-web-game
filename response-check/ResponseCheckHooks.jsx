const React = require('react');
const {useState, useRef} = React;

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('Click to start');
  const [result, setResult] = useState([]);
  let timeout = useRef(null);
  let startTime = useRef();
  let endTime = useRef();


  const onClickScreen = () => {
    if (state === 'waiting') { // 파랑일 때 클릭한 거면
      setState('ready');
      setMessage('Click when color is green');

      timeout.current = setTimeout(() => { // setTimeout으로 일정 시간 지나면 상태 바뀌도록
        setState('now');
        setMessage('Click now')
        startTime.current = Date.now();
      }, Math.floor(Math.random() * 1000) + 2000) // Random 2~3sec)

    } else if (state === 'ready') { // 상태가 빨강인데 클릭 되었으면? -> 너무 이른 것
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('Too soon');

    } else if (state === 'now') { // 상태가 초록인데 클릭한거면? -> Date로 반응속도체크
      endTime.current = Date.now();
      setState('waiting');
      setMessage('Click to start');
      setResult(prevState => [...prevState, endTime.current - startTime.current])
    }
  }
  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return result.length
      ? <div className="bottom">
        <div className="text">Response Time : {Math.round(result.reduce((a, c) => (a + c) / result.length))}ms</div>
        <button onClick={onReset}>Reset</button>
      </div>
      : null
  }

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  )
}


module.exports = ResponseCheck;