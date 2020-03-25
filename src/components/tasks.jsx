import React, { Component } from 'react';
import Task from './task'
class Tasks extends Component {
  state = {  }
  render() { 
    return ( 
    <div className="task-list">
      <Task />
    </div>
    );
  }
}
 
export default Tasks;