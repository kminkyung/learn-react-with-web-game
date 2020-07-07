const React = require('react');
const {useState, useRef} = React;

const WordChain = () => {
  const [word, setWord] = useState('시작');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onRefInput = (c) => {
    this.input = c;
  }
  const onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue('');
      setResult('Right!');
      inputRef.current.focus();
    } else {
      setWord(word);
      setValue('');
      setResult('Wrong!');
      inputRef.current.focus();
    }
  }
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput}/>
        <button>Click</button>
      </form>
      <div>{result}</div>
    </>
  )
}

module.exports = WordChain;