const React = require('react');
const {useState, useReducer, useCallback, useEffect, useRef} = React;
const Table = require('./Table');

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER :
      // state.winner = action.winner <- 이렇게 하면 안됨
      return {
        ...state,
        winner: action.winner,
      }
    case CLICK_CELL:
      return {
        ...state,
      }
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(()=> {
    dispatch({type: SET_WINNER, winner:'O'});
  }, [])
  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData}/>
      {state.winner && <div>Winner is {state.winner}</div>}
    </>
  )
}


module.exports = TicTacToe;