import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';


const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
  console.log('td rendered');

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);

    if(cellData) return;
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  }, [cellData]) // inputs: [cellData] 값이 바뀌는 것을 인지해야할 데이터

  return (
      <td onClick={onClickTd}>{cellData}</td>
  )
})


export default Td;