import React from 'react';
import { BrowserRouter, Link, Route, HashRouter } from 'react-router-dom';
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/game/number-baseball'>숫자 야구</Link>
        &nbsp;
        <Link to='/game/rock-scissors-paper'>가위 바위 보</Link>
        &nbsp;
        <Link to='/game/lotto-generator'>가위 바위 보</Link>
        &nbsp;
        <Link to='/game/index'>게임 매처</Link>
      </div>
      <div>
        <Route path='/game/:name' component={GameMatcher}/>
        <Route path='/game/:name'  render={(props) => <GameMatcher props={props}/>}/>
      </div>
    </BrowserRouter>
  )
}

export default Games;