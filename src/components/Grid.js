import React, { Component } from "react";
import { Modal } from "antd";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { checkStatusOfGame } from "./Checkmate";

export class Grid extends Component {
  state = {
    currentPlayer: {
      play: true,
    },
    nextPlayer: {
      play: false,
    },

    gameNumber: 0,
    winInfo: {
      whichPlayer: 0,
    },
    gameIsLive: true,
    winningCells: {},

    board: Array.from(Array(this.props.rows), () =>
      Array.from({ length: this.props.columns }, (_, i) => 0)
    ),
  };

  handleCellClick = (e, rowIndex, colIndex) => {
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

        const { isWin, winningDimensions, WonPlayer } = gameStatus;

        if (isWin) {
          this.setState({
            gameIsLive: false,
            winningCells: winningDimensions,
          });

          if (WonPlayer === 1) {
            console.log(this.props.firstPlayerName + " has won the game");
            this.setState({
              winInfo: {
                whichPlayer: 1,
              },
            });
          } else if (WonPlayer === 2) {
            console.log(this.props.secondPlayerName + " has won the game");
            this.setState({
              winInfo: {
                whichPlayer: 2,
              },
            });
          } else {
            console.log("Game is a tie");
            this.setState({
              winInfo: {
                whichPlayer: -1,
              },
            });
          }
        } else {
          this.setState({ gameIsLive: true });
        }

        this.setState({
          currentPlayer: {
            ...this.state.currentPlayer,
            play: !this.state.currentPlayer.play,
          },
          board: [...copyBoard],
        });
      }
    }
  };

  showWinModal = (name) => {
    Modal.success({
      content: `${name} has won the Game`,
    });
  };

  showTieModal = () => {
    Modal.info({
      content: "Well Played. It's a tie.",
    });
  };

  handleReset = () => {
    let number = this.state.gameNumber + 1;
    this.setState({
      gameNumber: number,
      winInfo: { whichPlayer: 0 },
      gameIsLive: true,
      winningCells: {},
      board: Array.from(Array(this.props.rows), () =>
        Array.from({ length: this.props.columns }, (_, i) => 0)
      ),
    });
  };

  render() {
    const { width, height } = useWindowSize;

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

    let cellBoard = Array.from(this.state.board).map((row, ri) => {
      let cells = row.map((cell, ci) => (
        <div
          className={`cell row-${ri} col-${ci} top-border`}
          key={`cell row-${ri} col-${ci} top-border`}
          style={{
            background: this.state.winningCells[ri + "-" + ci]
              ? "linear-gradient(45deg, #4370f1, #fff)"
              : undefined,
          }}
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
        <div className="Player-Turn">
          <p>
            {this.state.currentPlayer.play
              ? `${this.props.firstPlayerName}'s Turn`
              : `${this.props.secondPlayerName}'s Turn`}
            <i
              className="fas fa-circle"
              style={{
                color: this.state.currentPlayer.play
                  ? this.props.firstPlayerColor
                  : this.props.secondPlayerColor,
                marginLeft: 10,
              }}
            ></i>
          </p>
        </div>

        <div
          key={this.state.gameNumber}
          className="game-board"
          style={{
            gridTemplateColumns: `repeat(${this.props.columns}, 1fr)`,
            gridTemplateRows: `repeat(${this.props.rows}, 1fr)`,
          }}
        >
          {/* {gridBoardTop} */}

          {cellBoard}
        </div>

        <div className="footer">
          <button
            className="reset hvr-sweep-to-right"
            onClick={this.handleReset}
          >
            Reset
          </button>
          <span className="status"></span>
        </div>

        {this.state.winInfo.whichPlayer === 1
          ? this.showWinModal(this.props.firstPlayerName)
          : this.state.winInfo.whichPlayer === 2
          ? this.showWinModal(this.props.secondPlayerName)
          : this.state.winInfo.whichPlayer === -1
          ? this.showTieModal()
          : null}

        {this.state.gameIsLive ? null : (
          <Confetti width={width} height={height} />
        )}
      </div>
    );
  }
}

export default Grid;
