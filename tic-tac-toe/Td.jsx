import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';


const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);

    const ref = useRef([])
    useEffect(() => {
      console.log(rowIndex === ref.current[0]);
      ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData])

    if(cellData) return;
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  }, [cellData]) // inputs: [cellData] 값이 바뀌는 것을 인지해야할 데이터

  return (
      <td onClick={onClickTd}>{cellData}</td>
  )
})


export default Td;