
import React, { Component } from 'react';
import Todos from './Components/Todos';

import './App.css';
import Header from './Components/layout/Header';
import AddTodo from './Components/AddTodo';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with a friend',
        completed: false
      },
      {
        id: 3,
        title: 'Read article on React',
        completed: false
      },
    ]
  }

  toggleComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => {
      return todo.id !== id
    })]});
  }

  addTodo = (title) => {
    console.log(title);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header></Header>
          <AddTodo title={this.addTodo}></AddTodo>
          <Todos
            todos={this.state.todos}
            toggleComplete={ this.toggleComplete }
            delTodo={ this.delTodo }/>
        </div>
      </div>
    );
  }
}

export default App;
