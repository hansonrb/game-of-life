import React, { Component } from 'react';
import Grid from './grid';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    var initialGrid = this.emptyGrid(this.props.cols, this.props.rows);

    this.state = {
      generation: 0,
      on: false,
      data: initialGrid,
      intervalId: null
    };
  }

  neighbors(i,j) {
    var result = [];
    for (var offset_1 = -1; offset_1 <= 1; offset_1++) {
      for (var offset_2 = -1; offset_2 <= 1; offset_2 ++) {
        if (!(offset_1 === 0 && offset_2 === 0) && this.indexInBounds(i+offset_1, j+offset_2))
          result.push({x: i+offset_1, y: j+offset_2});
      }
    }
    return result;
  }

  liveNeighbors(i, j) {
    var neighs = this.neighbors(i,j)
    var live = neighs
      .map(coords => this.state.data[coords.x][coords.y])
      .reduce((acc, elt) => elt ? acc+1 : acc, 0);

    return live;
  }

  indexInBounds(i, j) {
    return (i>=0 && i<this.props.rows-1) && (j>=0 && j<this.props.cols-1);
  }

  step (oldGrid) { // solves for the next grid (brute force)
    var newGrid = this.emptyGrid();
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        var live = this.liveNeighbors(i, j);
        if (oldGrid[i][j]) {
          newGrid[i][j] = (live === 3 || live === 2);
        } else {
          newGrid[i][j] = (live === 3);
        }
      }
    }
    return newGrid;
  }

  toggleCell(nested_arr, i, j) {
    return nested_arr.map((arr, idx) => {
      if (idx !== i) return arr;
      else return arr.map((cell, idx) => {
          if (idx !== j) return cell;
          else return !cell;
      });
    });
  }

  emptyGrid() {
    var width = this.props.cols;
    var height = this.props.rows;
    var a = new Array(height);
    for (var i = 0; i < height; i++) {
      a[i] = new Array(width);
      for (var j = 0; j < width; j++) {
        a[i][j] = false;
      }
    }
    return a;
  }

  handleClick(x, y) {
    var new_data = this.toggleCell(this.state.data, x, y);
    this.setState({ data: new_data });
  }

  handlePlay() {
    if (this.state.on) {
      this.pause();
    } else {
      this.start();
    }
  }

  stop() {
    var initialGrid = this.emptyGrid(this.props.cols, this.props.rows);
    clearInterval(this.state.intervalId);
    this.setState({
      on: false,
      generation: 0,
      data: initialGrid,
    });
  }
  start() {
    var intervalId = setInterval(this.tick.bind(this), this.props.speed);
    this.setState({
      on: true,
      intervalId: intervalId
    });
  }

  pause() {
    clearInterval(this.state.intervalId);
    this.setState({ on: false });
  }

  tick() {
    var grid = this.state.data;
    var newGrid = this.step(grid);
    this.setState({
      generation : this.state.generation + 1,
      data: newGrid
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <h3>Generation: { this.state.generation }</h3>
          </div>
          <div className="row">
            <Grid
              handleClick={this.handleClick.bind(this)}
              data={this.state.data}
              rows={this.props.rows}
              cols={this.props.cols}
              cellSize={10}
              generation={this.state.generation}
            />
          </div>
          <div className="row">
            <button onClick={this.handlePlay.bind(this)} className="btn btn-primary">
              {this.state.on ? 'Pause' : 'Run' }
            </button>
            <button onClick={this.stop.bind(this)} className="btn btn-primary">
              Stop
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
