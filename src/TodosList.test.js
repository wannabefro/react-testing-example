import React from 'react';
import { shallow } from 'enzyme';
import TodosList from './TodosList';

jest.mock('./TodoItem');

describe('TodosList', () => {
  let wrapper;
  let todos;

  describe('When there are no todos', () => {
    beforeEach(() => {
      todos = [];
      wrapper = shallow(<TodosList todos={todos} />);
    });

    it('does not render anything', () => {
      expect(wrapper.getElement()).toBe(null);
    });
  });

  describe('When there are todos', () => {
    beforeEach(() => {
      todos = [
        {
          id: 123,
          dogs: 'dogs',
        }
      ];
      wrapper = shallow(<TodosList todos={todos} />);
    });

    it('renders each of the todo items', () => {
      const todoItems = wrapper.find('TodoItem');
      expect(todoItems.length).toEqual(1);

      expect(todoItems.first().props().dogs).toEqual('dogs');
    });
  });
});
