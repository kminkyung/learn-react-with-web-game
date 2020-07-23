const React = require('react');
const {useState, useReducer, useCallback, useEffect, useRef} = React;
const Table = require('./Table');

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
}

const SET_WINNER = 'SET_WINNER';
const CLICK_CELL = 'CLICK_CELL';
const CHANGE_TURN = 'SET_TURN';

const reducer = (state, action) => { // action을 dispatch할 때마다 reducer가 실행됨
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner <- 이렇게 하면 안됨
      return {
        ...state,
        winner: action.winner,
      }
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData
      }
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({type: SET_WINNER, winner: 'O'}); // 이 객체가 action
  }, [])

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
      {state.winner && <div>Winner is {state.winner}</div>}
    </>
  )
}


module.exports = {
  TicTacToe,
  SET_WINNER,
  CLICK_CELL,
  CHANGE_TURN,
};