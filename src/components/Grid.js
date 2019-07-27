import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";

import { initializeGrid } from "../redux/actions";

import Cell from "./Cell";
import Robot from "./Robot";

class Grid extends Component {
  componentDidMount() {
    this.props.initializeGrid(this.props.size);
  }

  renderCells() {
    return this.props.grid.map((row, index, array) => {
      // No need to render the last row as we are 0 based
      // index
      if (index === array.length - 1) return null;

      return (
        <div className="app-grid-cell-container" key={uuid()}>
          {row.map(cell => (
            <Cell
              key={uuid()}
              width={this.cellWidth()}
              height={this.cellWidth()}
            />
          ))}
        </div>
      );
    });
  }

  cellWidth() {
    return this.props.width / this.props.size.columns;
  }

  render() {
    const { width, currentPosition } = this.props;

    return (
      <div style={{ width: `${width}px` }} className="app-grid-container">
        <div className="app-shell-top-bar">
          <span>Game Board</span>
        </div>
        {this.renderCells()}
        <Robot
          offset={this.cellWidth()}
          width="20"
          height="20"
          position={currentPosition}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  grid: state.grid.board,
  currentPosition: state.grid.currentPosition
});

export default connect(
  mapStateToProps,
  { initializeGrid }
)(Grid);
