import React, { Component } from 'react';
import Cell from './cell';

export default class Grid extends Component {
  getDims() {
    var width = this.props.cellSize * this.props.cols;
    var height = this.props.cellSize * this.props.rows;
    return {
      width: width,
      height: height
    };
  }

  render() {
    var dims = this.getDims();
    const { handleClick, cellSize, generation } = this.props;

    return (
      <svg
        width={dims.width}
        height={dims.height}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        { this.props.data.map((row, i) =>
          row.map((cell, j) =>
            <Cell
              handleClick={ handleClick.bind(this) }
              live={ cell }
              cellSize={ cellSize }
              coords={ { x:i, y:j } }
              key={ i + ", " + j }
              generation={generation}
            />
          )
        ) }
      </svg>
    );
  }
}
