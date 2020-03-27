import React, { Component } from "react";
import Task from "./task";

import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const tasks = [
  { id: 1, name: "test task #1", selected: false },
  { id: 2, name: "test task #2", selected: false },
  { id: 3, name: "test task #3", selected: false },
  { id: 4, name: "test task #4", selected: false },
  { id: 5, name: "test task #5", selected: true }
];

const SortableItem = SortableElement(({ key, name, onClick, selected }) => (
  <li>
    <Task key={key} name={name} onClick={onClick} selected={selected} />
  </li>
));

const SortableList = SortableContainer(({ items, handlerClick }) => {
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
  state = {
    update: false,
    items: tasks
  };

  handleSubmit = event => {
    const { update, items } = this.state;
    const { value } = this.input;

    if (update) {
      const name = value;

      this.setState({
        items: items.map(item =>
          item.selected == true ? { ...item, name } : item
        ),
        update: false
      });
    } else {
      const id = Math.max(...items.map(item => item.id)) + 1;

      this.setState({
        items: [...items, { id: id, name: value, selected: false }]
      });
    }
    this.setState({ value: "" });
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClick = (name, isSelected) => {
    const { items } = this.state;
    const selected = !isSelected;

    this.setState({
      items: items.map(item =>
        item.name == name ? { ...item, selected } : item
      )
    });
  };

  handleDelete = () => {
    const newItems = this.state.items.filter(item => item.selected == false);

    this.setState({ items: newItems });
  };

  handleUpdate = () => {
    const selectedItems = this.state.items.filter(
      item => item.selected == true
    );
    if (selectedItems.length != 1) {
      alert("Please select only one task for update!");
    }

    this.input.focus();
    this.setState({ update: true });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };

  render() {
    return (
      <div className="task-list">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          ref={input => (this.input = input)}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        <SortableList
          items={this.state.items}
          handlerClick={this.handleClick}
          onSortEnd={this.onSortEnd}
          distance={1}
        />
        ;
        <button className="btn" onClick={this.handleUpdate}>
          Update task
        </button>
        <button className="btn" onClick={this.handleDelete}>
          Delete task
        </button>
      </div>
    );
  }
}

export default Tasks;
