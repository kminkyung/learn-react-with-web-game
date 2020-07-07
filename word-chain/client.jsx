const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

const WordChain = require('./WordChain');

const Hot = hot(WordChain);

ReactDOM.render(<Hot />, document.querySelector('#root'));