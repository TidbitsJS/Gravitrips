import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Welcome extends Component {
  gridInput = (value) => {
    console.log(value);
    if (value !== "")
      this.props.dispatch({
        type: "GRID_SELECT",
        payload: { gridValue: value },
      });
  };

  render() {
    return (
      <div className="App">
        <input
          type="Number"
          onChange={(e) => this.gridInput(e.target.value)}
          placeholder="Enter Number"
        />
        <Link to="/game">
          <button>Start</button>
        </Link>
      </div>
    );
  }
}

export default connect()(Welcome);
