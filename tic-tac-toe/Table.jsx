const React = require('react');
const {} = React;
const Tr = require('./Tr');

const Table = ({onClick, tableData, dispatch}) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (
        <Tr dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}
    </table>
  )
}


module.exports = Table;