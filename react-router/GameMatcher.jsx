import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NumberBaseball from "../number-baseball/NumberBaseball";
import RSP from "../rock-scissors-paper/RSP";
import Lotto from "../lotto/Lotto";

class GameMatcher extends Component {
  render() {
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball/>
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP/>
    } else if (this.props.match.params.name === 'lotto') {
      return <Lotto/>
    } else {
      return <div>일치하는 게임이 없습니다.</div>
    }
  }
}

export default withRouter(GameMatcher);