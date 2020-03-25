import React, { Component } from 'react';
import Task from './task'

const tasks = [
  { id: 1, name: "test task #1" },
  { id: 2, name: "test task #2" },
  { id: 3, name: "test task #3" },
  { id: 4, name: "test task #4" },
  { id: 5, name: "test task #5" }
]

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    this.setState({ items: [ ...this.state.items, { "name": this.state.value, key: "should update" }] });
    this.setState({ value: "" });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() { 
    return ( 
    <div className="task-list">
      
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
      
      {tasks.map( el => <Task key={el.id} name={el.name}/> )}
      {this.state.items.map( el => <Task key={el.id} name={el.name}/> )}
      
      <button className="btn">Update task</button>
      <button className="btn">Delete task</button>
    </div>
    );
  }
}
 
export default Tasks;