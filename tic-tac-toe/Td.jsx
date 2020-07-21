const React = require('react');
const {useCallback} = React;
import {CLICK_CELL} from "./TicTacToe";

const Td = ({rowIndex, cellIndex}) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  }, [])

  return (
      <Td onClick={onClickTd}>{''}</Td>
  )

}


module.exports = Td;