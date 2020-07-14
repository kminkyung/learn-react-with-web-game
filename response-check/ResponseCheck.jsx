const React = require('react');
const {Component} = React;

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: 'Click to start',
    result: []
  }
  timeout;
  startTime;
  endTime;

  onReset = () => {
    this.setState({
      result: []
    })
  }

  onClickScreen = () => {
    const {state, message, result} = this.state;
    if (state === 'waiting') { // 파랑일 때 클릭한 거면
      this.setState({
        state: 'ready', // 상태를 빨강으로 바꿔주고
        message: 'Click when color is green'
      })
      this.timeout = setTimeout(() => { // setTimeout으로 일정 시간 지나면 상태 바뀌도록
        this.setState({
          state: 'now',
          message: 'Click now',
        })
        this.startTime = Date.now();
      }, Math.floor(Math.random() * 1000) + 2000) // Random 2~3sec)
    } else if (state === 'ready') { // 상태가 빨강인데 클릭 되었으면? -> 너무 이른 것
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: 'Too soon'
      })
    } else if (state === 'now') { // 상태가 초록인데 클릭한거면? -> Date로 반응속도체크
      this.endTime = Date.now();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: 'Click to start',
          result: [...prevState.result, this.endTime - this.startTime]
        }
      })
    }
  }
  renderAverage = () => {
    const {result} = this.state;
    return result.length
        ? <div className="bottom"><div className="text">Response Time : {Math.round(result.reduce((a, c) => (a + c) / result.length))}ms</div>
          <button onClick={this.onReset}>Reset</button></div>
        : null
  }

  render() {
    const {state, message} = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    )
  }

}

module.exports = ResponseCheck;