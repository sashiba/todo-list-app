import React, { Component } from 'react';

class Task extends Component {
  render() {
    const { name, id } = this.props
    
  handleOtherChange = (val) => {
    this.props.handleChange(val, this.props.id)

  }
    return (  
      <input 
      onScroll={handleOtherChange}
        className="task"
        onClick={this.handleClick)}
        readonly={!selected}
      >
        <Iterage/>
        {this.props.name}
      </input>
    );
  }
}
 
export default Task;