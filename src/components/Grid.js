import React, { Component } from "react";

export class Grid extends Component {
  state = {
    currentPlayer: {
      play: true,
    },
    nextPlayer: {
      play: false,
    },

    board: Array.from(Array(this.props.columns), () =>
      Array.from({ length: this.props.rows }, (_, i) => 0)
    ),
  };

  handleCellClick = (e, rowIndex, colIndex) => {
    console.log(e.target.style.background === "");
    if (e.target.style.background === "") {
      this.state.currentPlayer.play
        ? (e.target.style.background = this.props.firstPlayerColor)
        : (e.target.style.background = this.props.secondPlayerColor);
    }
    this.setState({ currentPlayer: { play: !this.state.currentPlayer.play } });
  };

  render() {
    console.log(this.props.firstPlayerName, this.props.secondPlayerName);
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

    let board = this.state.board.map((row, ri) => {
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
          {gridBoardTop}
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
