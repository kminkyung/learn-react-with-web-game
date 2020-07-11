const React = require('react');
const {PureComponent, memo} = React;

// class Try extends PureComponent {
//   render() {
//     const {tryInfo} = this.props;
//     return (
//       <li>
//         <b>{tryInfo.try}</b>
//         <b>{tryInfo.result}</b>
//       </li>
//     )
//   }
// }

const Try = memo(({tryInfo}) => {
  const [result, setResult] = useState(tryInfo.result);
  return (
    <li>
      <b>{tryInfo.try}</b>
      <b>{tryInfo.result}</b>
    </li>
  )
})


module.exports = Try;