import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';


const reducer = (state, action) => { // action을 dispatch할 때마다 reducer가 실행됨
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner <- 이렇게 직접 바꾸면 안됨. 새로운 객체를 만들어서 복사해줘야 함
      return {
        ...state,
        winner: action.winner,
      } // 새로운 state를 만들어서 바뀌는 부분만 바뀌는 것 <- 불변성
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        recentCell: [-1, -1]
      }
    }
    default:
      return state;
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, turn, winner, recentCell} = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({type: SET_WINNER, winner: 'O'}); // 이 객체가 action. type은 action의 이름
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0) {
      return;
    }

    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if (win) { // 승리시
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESET_GAME});
    } else {
      let all = true; // all = true 면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if(!cell) {
            all = false;
          }
        });
      });
      if(all) {
        dispatch({type: RESET_GAME});
      } else {
        dispatch({type: CHANGE_TURN});
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>Winner is {winner}</div>}
    </>
  )
}


export default TicTacToe;