import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ title }) => (
  <li>
    <label>
      {title}
    </label>
  </li>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TodoItem;
