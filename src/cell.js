import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { color: '#ffffff' };
  }

  getSVGPos() {
    var svg_x_pos = this.props.coords.y * this.props.cellSize
    var svg_y_pos = this.props.coords.x * this.props.cellSize
    return { x: svg_x_pos, y: svg_y_pos }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.generation !== nextProps.generation &&
      nextProps.generation === 0) {
      this.setState({ color: '#ffffff' });
    } else if (!this.props.live && nextProps.live) {
      this.setState({ color: '#0000ff' });
    } else if (this.props.live && !nextProps.live) {
      this.setState({ color: '#eeeeee' });
    }
  }

  onRectClick(event) {
    event.preventDefault();
    this.props.handleClick(this.props.coords.x, this.props.coords.y);
  }
  render() {
    var svgPos = this.getSVGPos();
    return (
      <rect
        onClick={this.onRectClick.bind(this)}
        x={ svgPos.x }
        y={ svgPos.y }
        width={ this.props.cellSize }
        height={ this.props.cellSize }
        fill={ this.state.color }
        stroke="#cccccc"
        strokeWidth="1"
      />
    );
  }
}
