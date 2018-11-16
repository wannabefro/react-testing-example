import React from 'react';
import TodosList from './TodosList';
import { generateId } from './utils';

export const ENTER_KEY = 13;

class App extends React.Component {
  state = {
    newTodo: '',
    todos: [],
  };

  onChange = e => {
    this.setState({ newTodo: e.target.value });
  }

  onKeyDown = e => {
    if (e.keyCode !== ENTER_KEY) return;
    e.preventDefault();

    const { newTodo, todos } = this.state;
    const title = newTodo.trim();

    if (title) {
      this.setState({ todos: [...todos, {
        id: generateId(),
        title,
      }], newTodo: ''});
    }
  }

  render() {
    const { todos, newTodo } = this.state;
    return (
      <div>
        <header className='header'>
          <h1>Todos</h1>
        </header>
        <input
          className='new-todo'
          value={newTodo}
          placeholder='What needs to be done?'
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <TodosList todos={todos} />
      </div>
    );
  }
}

export default App;
