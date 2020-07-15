const React = require('react');
const {Component} = React;

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount -> (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 해당 컴포넌트를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoord = {
  rock: '0',
  scissors: '-142px',
  paper: ''
}


class RSP extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: 0
  }

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링 된 후 실행되는 곳, 여기서 비동기 요청을 주로 하는 편
    this.interval = setInterval(() => {
      const {imgCoord} = this.state;
      if(imgCoord === rspCoord.rock) {
        this.setState({
          imgCoord: rspCoord.scissors
        })
      } else if (imgCoord === rspCoord.scissors){
        this.setState({
          imgCoord: rspCoord.paper
        })
      } else if (imgCoord === rspCoord.paper) {
        this.setState({
          imgCoord: rspCoord.rock
        })
      }
    }, 1000)
  }
  componentDidUpdate(prevProps, prevState, snapshot) { // 리렌더링 후 실행되는 곳
  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전 실행되는 곳, 비동기 요청 정리를 하는 편
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => {

  }

  render() {
    const {result, score, imgCoord} = this.state;
  }
}

module.exports = RSP;