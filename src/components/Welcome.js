import React, { Component } from "react";
import { InputNumber, Button, Input, Select } from "antd";

import "antd/dist/antd.css";
import Grid from "./Grid";

const { Option } = Select;

export class Welcome extends Component {
  state = {
    rows: 4,
    columns: 4,
    dots: 4,
    start: false,
    firstPlayer: {
      name: "Mr. Red",
      color: "#ff0000",
    },
    secondPlayer: {
      name: "Mr. Green",
      color: "#98FB98",
    },
  };

  gridRowInput = (value) => {
    if (value % 1 !== 0) return;

    this.setState({ rows: value });
  };

  gridColInput = (value) => {
    if (value % 1 !== 0) return;
    this.setState({ columns: value });
  };

  gridDotInput = (value) => {
    if (value % 1 !== 0) return;
    this.setState({ dots: value });
  };

  handleStart = () => {
    this.setState({ start: true });
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

  onFirstPlayerColorChange = (value) => {
    console.log(value);

    this.setState({
      firstPlayer: { ...this.state.firstPlayer, color: value },
    });
  };

  onSecondPlayerColorChange = (value) => {
    console.log(value);

    this.setState({
      secondPlayer: { ...this.state.secondPlayer, color: value },
    });
  };

  render() {
    if (!this.state.start) {
      return (
        <div className="App">
          <div className="head-title glass">
            <h1 className="cssanimation sequence effect3d lePushReleaseFrom">
              {" "}
              Connect the Dots{" "}
            </h1>
          </div>
          <div className="Grid-UserInput">
            <div className="Grid-Row-UserInput glass">
              <p>Enter Rows: </p>
              <InputNumber
                type="number"
                min={4}
                max={12}
                defaultValue={4}
                value={this.state.rows}
                onChange={this.gridRowInput}
              />
            </div>
            <div className="Grid-dot-UserInput glass">
              <p>Enter Dots: </p>
              <InputNumber
                type="number"
                min={4}
                max={6}
                defaultValue={4}
                value={this.state.dots}
                onChange={this.gridDotInput}
              />
            </div>
            <div className="Grid-Col-UserInput glass">
              <p>Enter Columns: </p>
              <InputNumber
                type="number"
                min={4}
                max={12}
                defaultValue={4}
                value={this.state.columns}
                onChange={this.gridColInput}
              />
            </div>
          </div>

          <div className="Grid-NameInput">
            <div className="Grid-FirstName-Input glass">
              <p>Player 1st:</p>
              <Input
                placeholder="Enter First Player Name"
                onChange={(e) => this.onFirstPlayerNameChange(e)}
              />
            </div>
            <div className="Grid-SecondName-Input glass">
              <p>Player 2nd:</p>
              <Input
                placeholder="Enter Second Player Name"
                onChange={(e) => this.onSecondPlayerNameChange(e)}
              />
            </div>
          </div>

          <div className="Grid-ColorChoice">
            <div className="Grid-FirstPlayer-ColorChoice glass">
              <p>FirstPlayer Color:</p>
              <Select
                defaultValue="#ff0000"
                style={{ width: 110 }}
                onChange={this.onFirstPlayerColorChange}
              >
                <Option value="#0ec74f">
                  Green{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#0ec74f" }}
                  ></i>
                </Option>
                <Option value="#ff0000">
                  Red{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#ff0000 " }}
                  ></i>
                </Option>
                <Option value="#ffc200">
                  Yellow{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#ffc200" }}
                  ></i>
                </Option>
                <Option value="#0092fa">
                  Blue{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#0092fa" }}
                  ></i>
                </Option>
              </Select>
            </div>

            <div className="Grid-SecondPlayer-ColorChoice glass">
              <p>SecondPlayer Color:</p>
              <Select
                defaultValue="#98FB98"
                style={{ width: 110 }}
                onChange={this.onSecondPlayerColorChange}
              >
                <Option value="#EB7405">
                  Tango{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#EB7405" }}
                  ></i>
                </Option>
                <Option value="#98FB98">
                  Mint{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#98FB98 " }}
                  ></i>
                </Option>
                <Option value="#00EAFF">
                  Aqua{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#00EAFF" }}
                  ></i>
                </Option>
                <Option value="#FF5999">
                  Rose{" "}
                  <i
                    className="fas fa-circle"
                    style={{ marginLeft: 5, color: "#FF5999" }}
                  ></i>
                </Option>
              </Select>
            </div>
          </div>

          <Button
            style={{ marginTop: 10, marginBottom: 13 }}
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
