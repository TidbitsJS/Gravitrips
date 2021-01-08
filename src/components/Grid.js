import React, { Component } from "react";
import { connect } from "react-redux";

const GameGrid = (state) => {
  console.log("game grid", state);
};

export class Grid extends Component {
  render() {
    return (
      <div className="Game-Grid-Container">
        <div className="game-board">
          <div className="cell row-top col-0 top"></div>

          <div className="cell row-0 col-0 left-border top-border"></div>
          <div className="cell row-0 col-1 top-border"></div>
          <div className="cell row-0 col-6 top-border right-border"></div>

          <div className="cell row-5 col-0 bottom-border left-border"></div>
          <div className="cell row-5 col-6 bottom-border right-border"></div>
        </div>
        {GameGrid(this.props.state)}
        <div className="footer">
          <button className="reset hvr-sweep-to-right">Reset</button>
          <span className="status"></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(Grid);
