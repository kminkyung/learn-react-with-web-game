import React, {useContext} from 'react';
import Td from './Td';
import {TableContext} from "./MineSearch";

const Tr = ({rowIndex}) => {
  const {tableData} = useContext(TableContext)

  return (
    <tr>
      {Array(tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td rowIndex={rowIndex} cellData={i}/>))}
    </tr>
  )
}

export default Tr;