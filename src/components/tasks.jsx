import React, { Component } from 'react';
import Task from './task';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const tasks = [
  { id: 1, name: "test task #1", selected: false },
  { id: 2, name: "test task #2", selected: false },
  { id: 3, name: "test task #3", selected: false },
  { id: 4, name: "test task #4", selected: false },
  { id: 5, name: "test task #5", selected: true }
]

const SortableItem = SortableElement(({key, name, onClick, selected}) => (
  <li>
    <Task 
      key={key} 
      name={name} 
      onClick={onClick} 
      selected={selected} 
    />
  </li>
));
const SortableList = SortableContainer(({items, handlerClick}) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SortableItem 
          key={`item-${item.id}`}
          name={item.name}
          onClick={handlerClick}
          selected={item.selected} 
          index={index} 
        />
      ))}
    </ul>
  );
});

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      update: false,
      items: tasks
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  
  handleSubmit(event) {
    if (this.state.update) {
      const name = this.state.value;

      this.setState({ items: this.state.items.map( item => item.selected == true ? {...item, name } : item) });
      this.setState({ update: false });
    } else {
      const id = Math.max(...this.state.items.map( item => item.id)) + 1;
    
      this.setState({ items: [ ...this.state.items, { id: id, "name": this.state.value, "selected": false }] });
    }
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
    return ( 
    <div className="task-list">
      
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} ref={ input => this.input = input } />
        <input type="submit" value="Submit" />
      </form>
      
      <SortableList items={this.state.items} handlerClick={this.handleClick} onSortEnd={this.onSortEnd} distance={1} />;

      <button className="btn" onClick={this.handleUpdate}>Update task</button>
      <button className="btn" onClick={this.handleDelete}>Delete task</button>
    </div>
    );
  }
}
 
export default Tasks;
