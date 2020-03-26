import React, { Component } from 'react';
import Task from './task'

const tasks = [
  { id: 1, name: "test task #1", selected: false },
  { id: 2, name: "test task #2", selected: false },
  { id: 3, name: "test task #3", selected: false },
  { id: 4, name: "test task #4", selected: false },
  { id: 5, name: "test task #5", selected: true }
]

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: tasks
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleSubmit(event) {
    this.setState({ items: [ ...this.state.items, { "name": this.state.value, key: "should update", "selected": false }] });
    this.setState({ value: "" });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(name, isSelected) {
    const itemIndex = this.state.items.findIndex( item => item.name == name );
    const selected = !isSelected;
    
    this.setState({ items: this.state.items.map( item => item.name == name ? {...item, selected } : item) });
  }

  handleDelete() {
    const newItems = this.state.items.filter( item => item.selected == false );
    
    this.setState({ items: newItems });
  }

  render() { 
    return ( 
    <div className="task-list">
      
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
      
      {this.state.items.map( el => <Task key={el.id} name={el.name} onClick={this.handleClick} selected={el.selected}/> )}
      
      <button className="btn">Update task</button>
      <button className="btn" onClick={this.handleDelete}>Delete task</button>
    </div>
    );
  }
}
 
export default Tasks;