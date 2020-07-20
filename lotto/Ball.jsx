const React = require('react');
const {memo} = React;

// 고차함수 컴포넌트(high order compnent). hooks 아님!
const Ball = memo(({number}) => { // memo = PureComponent
  // const {number} = this.props;
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return (
    <div className="ball" style={{background}}>{number}</div>
  )
})


module.exports = Ball;