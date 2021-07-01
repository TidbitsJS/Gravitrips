import React, { Component } from "react";
import { Modal } from "antd";
import Confetti from "react-confetti";
import { checkStatusOfGame } from "./Checkmate";

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: {
        play: true,
      },

      width: null,
      height: null,

      nextPlayer: {
        play: false,
      },

      gameNumber: 0,
      winInfo: {
        whichPlayer: 0,
      },

      gameIsLive: true,
      winningCells: {},
      currentColumn: null,

      playerColors: {
        1: this.props.firstPlayerColor,
        2: this.props.secondPlayerColor,
      },

      board: Array.from(Array(this.props.rows), () =>
        Array.from({ length: this.props.columns }, (_, i) => 0)
      ),
    };

    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  lastBall = (rowIndex, colIndex) => {
    let board = this.state.board;
    let lastEmpty = 0;

    for (var i = this.props.rows - 1; i >= 0; i--) {
      lastEmpty = i;

      if (board[i][colIndex] === 0) {
        break;
      }
    }

    return lastEmpty;
  };

  handleCellClick = (e, rowIndex, colIndex) => {
    if (this.state.gameIsLive) {
      if (e.target.style.background === "") {
        let copyBoard = this.state.board;
        let PlayerID;

        let lastEmptyBall = this.lastBall(rowIndex, colIndex);

        this.state.currentPlayer.play
          ? (copyBoard[lastEmptyBall][colIndex] = 1)
          : (copyBoard[lastEmptyBall][colIndex] = 2);

        this.state.currentPlayer.play ? (PlayerID = 1) : (PlayerID = 2);

        let gameStatus = checkStatusOfGame(
          this.state.board,
          lastEmptyBall,
          colIndex,
          PlayerID,
          e.target,
          this.props.rows,
          this.props.columns
        );

        const { isWin, winningDimensions, wonPlayer } = gameStatus;

        this.setState(
          {
            currentPlayer: {
              ...this.state.currentPlayer,
              play: !this.state.currentPlayer.play,
            },
            gameIsLive: !isWin,
            winningCells: winningDimensions,
            winInfo: { whichPlayer: wonPlayer },
            currentColumn: null,
            board: [...copyBoard],
          },
          () => {
            if (isWin) {
              wonPlayer === -1 ? this.showTieModal() : this.showWinModal();
            }
          }
        );
      }
    }
  };

  handleMouseOver = (column) => {
    if (!this.state.winInfo.whichPlayer) {
      this.setState({ currentColumn: column });
    }
  };

  handleMouseOut = () => {
    this.setState({ currentColumn: null });
  };

  handleBoardTopMouseOver = (e, column) => {
    e.target.style.background = this.state.currentPlayer.play
      ? this.props.firstPlayerColor
      : this.props.secondPlayerColor;
  };

  handleBoardTopMouseOut = (e) => {
    e.target.style.background = "#fff";
    if (!this.state.winInfo.whichPlayer) {
      this.setState({ currentColumn: null });
    }
  };

  showWinModal = () => {
    console.log(this.state.winInfo);
    let winner =
      this.state.winInfo.whichPlayer === 1
        ? this.props.firstPlayerName
        : this.props.secondPlayerName;
    let loser =
      this.state.winInfo.whichPlayer === 1
        ? this.props.secondPlayerName
        : this.props.firstPlayerName;
    Modal.success({
      title: <h3>Congrats {winner}</h3>,
      content: (
        <div>
          <p>{winner} has outsmarted the opponent</p>
          <br />
          <br />
          <br />
          <p>Better luck next time {loser}</p>
        </div>
      ),
    });
  };

  showTieModal = () => {
    Modal.info({
      title: <h3>Dead Heat</h3>,
      content: (
        <div>
          <p>Well Played players</p>
          <p>It's a Tie</p>
          <br />
          <br />
          <br />
          <p>How about a rematch?</p>
        </div>
      ),
    });
  };

  handleReset = () => {
    let number = this.state.gameNumber + 1;
    this.setState({
      gameNumber: number,
      winInfo: { whichPlayer: 0 },
      gameIsLive: true,
      winningCells: {},
      currentColumn: null,
      board: Array.from(Array(this.props.rows), () =>
        Array.from({ length: this.props.columns }, (_, i) => 0)
      ),
    });
  };

  render() {
    let { board, playerColors } = this.state;

    const gridBoardTop = [...new Array(this.props.columns)].map(
      (girdRow, index) => (
        <div
          className={`cell row-top col-${index} top`}
          key={index + `cell row-top col-${index} top`}
          onMouseOver={(e) =>
            (e.target.style.color = this.state.currentPlayer.play
              ? this.props.firstPlayerColor
              : this.props.secondPlayerColor)
          }
        >
          <div
            className="ball"
            style={{
              backgroundColor:
                this.state.currentColumn === index
                  ? this.state.currentPlayer.play
                    ? this.props.firstPlayerColor
                    : this.props.secondPlayerColor
                  : "#fff",
            }}
            onMouseOver={(e) => this.handleBoardTopMouseOver(e, index)}
            onMouseOut={(e) => this.handleBoardTopMouseOut(e)}
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
            style={{
              backgroundColor: playerColors[board[ri][ci]],
            }}
            onClick={(e) => this.handleCellClick(e, ri, ci)}
            onMouseOver={(e) => this.handleMouseOver(ci)}
            onMouseOut={(e) => this.handleMouseOver()}
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
          {gridBoardTop}

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

        {this.state.gameIsLive ? (
          " "
        ) : (
          <Confetti width={this.state.width - 30} height={this.state.height} />
        )}
      </div>
    );
  }
}

export default Grid;
