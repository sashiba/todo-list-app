import React, { Component } from 'react';

class Task extends Component {
  // task(key, name, selected)
  constructor(props) {
    super(props);
  }

  getClass(selected) {
    return selected ? "task-selected" : "task"
  }

  handleClick() {
    console.log('handleCLIckTASk');
    console.log(this.props);
    this.props.onClick(this.props.name, this.props.selected);
  }

  render() { 
    return (  
      <div 
        className={this.getClass(this.props.selected)}
        onClick={this.handleClick.bind(this)}
      >
        {this.props.name}
      </div>
    );
  }
}
 
export default Task;