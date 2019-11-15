
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import uuid from 'uuid';

import Todos from './Components/Todos';
import Header from './Components/layout/Header';
import AddTodo from './Components/AddTodo';
import About from './Components/pages/About';

import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner with a friend',
        completed: false
      },
      {
        id: uuid.v4(),
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
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ 
      todos: [...this.state.todos, newTodo]
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={ this.addTodo } />
                <Todos
                  todos={ this.state.todos }
                  toggleComplete={ this.toggleComplete }
                  delTodo={ this.delTodo } />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />   
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
