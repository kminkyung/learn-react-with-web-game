const React = require('react');

const Try = ({tryInfo}) => {
  return (
    <li>
      <b>{tryInfo.try}</b>
      <b>{tryInfo.result}</b>
    </li>
  )
}


module.exports = Try;