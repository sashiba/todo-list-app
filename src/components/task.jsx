import React, { Component } from "react";

class Task extends Component {
  getClass(selected) {
    return selected ? "task-selected" : "task";
  }

  handleClick = () => {
    this.props.onClick(this.props.name, this.props.selected);
  };

  render() {
    return (
      <div
        className={this.getClass(this.props.selected)}
        onClick={this.handleClick}
      >
        {this.props.name}
      </div>
    );
  }
}

export default Task;
