import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "./Grid";

export class Welcome extends Component {
  state = {
    rows: null,
  };

  gridInput = (value) => {
    console.log(value);
  };

  render() {
    if (!this.state.rows) {
      return (
        <div className="App">
          <input
            type="Number"
            onChange={(e) => this.gridInput(e.target.value)}
            placeholder="Enter Number"
            onKeyDown={(e) =>
              e.keyCode === 13 ? this.setState({ rows: e.target.value }) : {}
            }
          />
        </div>
      );
    } else
      return (
        <div className="App">
          <Grid rows={+this.state.rows} />
        </div>
      );
  }
}

export default connect()(Welcome);
