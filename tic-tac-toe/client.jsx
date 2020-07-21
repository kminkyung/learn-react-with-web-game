const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

const TicTacToe = require('./TicTacToe');

const Hot = hot(TicTacToe);

ReactDOM.render(<Hot />, document.querySelector('#root'));
