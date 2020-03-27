import React, { Component } from 'react';
import Task from './task';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const tasks = [
  { id: 1, name: "test task #1", selected: false },
  { id: 2, name: "test task #2", selected: false },
  { id: 3, name: "test task #3", selected: false },
  { id: 4, name: "test task #4", selected: false },
  { id: 5, name: "test task #5", selected: true }
]

class Tasks extends Component {
  
  state = {
    value: '',
    update: false,
    items: tasks
  };


  renderTask = (name) => {
    const { selected } = this.state 
    
    return (
      <input 
        className="task"
        onClick={this.handleClick}
        readonly={!selected}
        onChange={(val) => this.props.handleChange(val, this.props.id)}
      >
        name
      </input>
    );
  }
  
  handleChange = (name, id) => {
    const item = this.state.items.find(item => item.id === id)
    item.value = name;
    this.setState({ items: [ ...this.state.items, item] });
    addCampaignItem(val)
  }

  handleSubmit = () => {
    const { value } = this.state

    this.setState({ items: [ ...this.state.items, { id: uuid.v4(), value: this.state.value}] });
  }

  handleDelete () {
    const newItems = this.state.items.filter( item => item.selected == false );
    
    this.setState({ items: newItems });
  }

  handleUpdate() {
    const selectedItems = this.state.items.filter(item => item.selected == true);
    if (selectedItems.length != 1) {
      alert("Please select only one task for update!")
    }

    this.input.focus();
    this.setState({ update: true });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() { 
    this.props.campaign_items
    return ( 
    <div className="task-list">
      
      <input type="text" value={this.state.value} onChange={this.handleChange} ref={ input => this.input = input } />
      <button onClick={this.handleSubmit}>Submit</button>
      
      {items.map((item, index) => (
         SortableElement(({key, name, onClick, selected}) => (
          <li key={key}>
           {this.renderTask(name)}
          </li>
        ))
      ))
      }
      <button className="btn" onClick={this.handleUpdate}>Update task</button>
      <button className="btn" onClick={this.handleDelete}>Delete task</button>
    </div>
    );
  }
}
 
export default Tasks;
