import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodosList = ({ todos }) => {
  if (!todos.length) {
    return null;
  }

  return (
    <section className='main'>
      <ul className='todo-list'>
        {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
      </ul>
    </section>
  );
};

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default TodosList;
