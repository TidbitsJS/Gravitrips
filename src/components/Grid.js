import React, { Component } from "react";
import { checkStatusOfGame } from "./Checkmate";

export class Grid extends Component {
  state = {
    currentPlayer: {
      play: true,
    },
    nextPlayer: {
      play: false,
    },

    gameIsLive: true,

    board: Array.from(Array(this.props.rows), () =>
      Array.from({ length: this.props.columns }, (_, i) => 0)
    ),
  };

  handleCellClick = (e, rowIndex, colIndex) => {
    console.log(e.target.style.background === "");
    if (this.state.gameIsLive) {
      if (e.target.style.background === "") {
        let copyBoard = this.state.board;
        let PlayerID;

        this.state.currentPlayer.play
          ? (copyBoard[rowIndex][colIndex] = 1)
          : (copyBoard[rowIndex][colIndex] = 2);

        this.state.currentPlayer.play
          ? (e.target.style.background = this.props.firstPlayerColor)
          : (e.target.style.background = this.props.secondPlayerColor);

        this.state.currentPlayer.play ? (PlayerID = 1) : (PlayerID = 2);

        let gameStatus = checkStatusOfGame(
          this.state.board,
          rowIndex,
          colIndex,
          PlayerID,
          e.target,
          this.props.rows,
          this.props.columns
        );

        gameStatus
          ? this.setState({ gameIsLive: false })
          : this.setState({ gameIsLive: true });
        this.setState({
          currentPlayer: { play: !this.state.currentPlayer.play },
          board: [...copyBoard],
        });
      }
    }
  };

  render() {
    const gridBoardTop = [...new Array(this.props.columns)].map(
      (girdRow, index) => (
        <div
          className={`cell row-top col-${index} top`}
          key={index + `cell row-top col-${index} top`}
          onMouseOver={(e) =>
            (e.target.style.color = this.props.firstPlayerColor)
          }
        >
          <div
            className="ball"
            onMouseOver={(e) =>
              (e.target.style.background = this.props.firstPlayerColor)
            }
            onMouseOut={(e) => (e.target.style.background = "#fff")}
          ></div>
        </div>
      )
    );

    let board = Array.from(this.state.board).map((row, ri) => {
      let cells = row.map((cell, ci) => (
        <div
          className={`cell row-${ri} col-${ci} top-border`}
          key={`cell row-${ri} col-${ci} top-border`}
        >
          <div
            key={`cell row-${ri} col-${ci} top-border-ball`}
            className="ball"
            onClick={(e) => this.handleCellClick(e, ri, ci)}
          ></div>
        </div>
      ));
      return cells;
    });

    return (
      <div className="Game-Grid-Container">
        <div
          className="game-board"
          style={{
            gridTemplateColumns: `repeat(${this.props.columns}, 1fr)`,
            gridTemplateRows: `repeat(${this.props.rows}, 1fr)`,
          }}
        >
          {/* {gridBoardTop} */}
          {board}
        </div>
        <div className="footer">
          <button className="reset hvr-sweep-to-right">Reset</button>
          <span className="status"></span>
        </div>
      </div>
    );
  }
}

export default Grid;
