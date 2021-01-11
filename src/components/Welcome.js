import React, { Component } from "react";
import { InputNumber, Button, Input } from "antd";
import { SketchPicker } from "react-color";

import "antd/dist/antd.css";
import Grid from "./Grid";

export class Welcome extends Component {
  state = {
    rows: 7,
    columns: 7,
    start: false,
    firstPlayer: {
      name: "Mr. Red",
      color: "red",
    },
    secondPlayer: {
      name: "Mr. Green",
      color: "green",
    },
    displayFirstColorPicker: false,
    displaySecondColorPicker: false,
  };

  gridRowInput = (value) => {
    this.setState({ rows: value });
  };

  gridColInput = (value) => {
    this.setState({ columns: value });
  };

  handleStart = () => {
    this.setState({ start: true });
  };

  handleFirstClick = () => {
    this.setState({
      displayFirstColorPicker: !this.state.displayFirstColorPicker,
    });
  };

  handleSecondClick = () => {
    this.setState({
      displaySecondColorPicker: !this.state.displaySecondColorPicker,
    });
  };

  handleFirstClose = () => {
    this.setState({ displayFirstColorPicker: false });
  };

  handleSecondClose = () => {
    this.setState({ displaySecondColorPicker: false });
  };

  handleFirstChange = (color) => {
    this.setState({
      firstPlayer: { name: this.state.firstPlayer.name, color: color.hex },
    });
  };

  handleSecondChange = (color) => {
    this.setState({
      secondPlayer: { name: this.state.secondPlayer.name, color: color.hex },
    });
  };

  onFirstPlayerNameChange = (e) => {
    this.setState({
      firstPlayer: {
        name: e.target.value,
        color: this.state.firstPlayer.color,
      },
    });
  };

  onSecondPlayerNameChange = (e) => {
    this.setState({
      secondPlayer: {
        name: e.target.value,
        color: this.state.secondPlayer.color,
      },
    });
  };

  render() {
    const styles = {
      firstColor: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${this.state.firstPlayer.color}`,
      },
      secondColor: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${this.state.secondPlayer.color}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    };

    if (!this.state.start) {
      return (
        <div className="App">
          <div className="Grid-UserInput">
            <div className="Grid-Row-UserInput">
              <p>Enter Rows: </p>
              <InputNumber
                min={4}
                max={20}
                defaultValue={4}
                onChange={this.gridRowInput}
              />
            </div>
            <div className="Grid-Col-UserInput">
              <p>Enter Columns: </p>
              <InputNumber
                min={4}
                max={20}
                defaultValue={4}
                onChange={this.gridColInput}
              />
            </div>
          </div>

          <div className="Grid-NameInput">
            <div className="Grid-FirstName-Input">
              <p>Player 1st:</p>
              <Input
                placeholder="Enter First Player Name"
                onChange={(e) => this.onFirstPlayerNameChange(e)}
              />
            </div>
            <div className="Grid-SecondName-Input">
              <p>Player 2nd:</p>
              <Input
                placeholder="Enter Second Player Name"
                onChange={(e) => this.onSecondPlayerNameChange(e)}
              />
            </div>
          </div>

          <div className="Grid-ColorChoice">
            <div className="Grid-FirstPlayer-ColorChoice">
              <p>FirstPlayer Color:</p>
              <div style={styles.swatch} onClick={this.handleFirstClick}>
                <div style={styles.firstColor} />
              </div>
              {this.state.displayFirstColorPicker ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleFirstClose} />
                  <SketchPicker
                    color={this.state.firstPlayer.color}
                    onChange={this.handleFirstChange}
                  />
                </div>
              ) : null}
            </div>

            <div className="Grid-SecondPlayer-ColorChoice">
              <p>SecondPlayer Color:</p>
              <div style={styles.swatch} onClick={this.handleSecondClick}>
                <div style={styles.secondColor} />
              </div>
              {this.state.displaySecondColorPicker ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleSecondClose} />
                  <SketchPicker
                    color={this.state.secondPlayer.color}
                    onChange={this.handleSecondChange}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <Button
            style={{ marginTop: 10 }}
            type="primary"
            onClick={this.handleStart}
          >
            Start
          </Button>
        </div>
      );
    } else
      return (
        <div className="App">
          <Grid
            rows={+this.state.rows}
            columns={+this.state.columns}
            firstPlayerColor={this.state.firstPlayer.color}
            secondPlayerColor={this.state.secondPlayer.color}
            firstPlayerName={this.state.firstPlayer.name}
            secondPlayerName={this.state.secondPlayer.name}
          />
        </div>
      );
  }
}

export default Welcome;
