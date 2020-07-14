const React = require('react');
const { useState, useRef, memo } = React;
const Try = require('./Try');

function getNumbers() {
  console.log("getNumbers");
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [...Array(4)];
  return arr.map((v, i) => candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
}

const NumberBaseball = memo(() => {
  const [result, setResult] = useState('숫자야구');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef();

 const onChangeInput = (e) => {
   setValue(e.target.value);
  }

 const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) { // 정답
      setResult('Home run!');
      setTries((prev) => [...prev, {try: value, result: 'Home run!'}])
      alert('홈런! 게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();
    } else { // 오답
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 10) { // 오답 10번
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join('')}였습니다!`);
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else { // 다시 기회
        answer.forEach((answer, i) => {
          if (answerArray[i] === answer) {
            strike++;
          } else if (answerArray.includes(answer)) {
            ball++;
          }
        })
        setValue('');
        setTries((prev) => [...prev, {try: value, result : ` : ${strike} 스트라이크, ${ball} 볼입니다.`}])
        inputEl.current.focus();
      }
    }
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}/>
        <button type='submit'>시도</button>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => < Try key={i} tryInfo={v} />)}
      </ul>
    </>
  )
})

module.exports = NumberBaseball;