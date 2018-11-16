import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { shallow } from 'enzyme';
import * as utils from './utils';
import App, { ENTER_KEY } from './App';

test('creating a new todo', () => {
  const { getByPlaceholderText, getByTestId, asFragment } = render(<App />);
  const input = getByPlaceholderText('What needs to be done?');

  fireEvent.change(input, { target: { value: 'React testing' } });
  fireEvent.keyDown(input, { keyCode: 13 });

  expect(getByTestId('todosList')).toHaveTextContent('React testing');
  expect(asFragment()).toMatchSnapshot();
});

describe('App', () => {
  const value = 'Bob';
  const id = 123;

  jest.mock('./TodosList');
  jest.mock('./utils', () => ({
    generateId: jest.fn(() => 123),
  }));
  let wrapper;

  beforeEach(() => {
    utils.generateId = jest.fn(() => id);
    wrapper = shallow(<App />);
    wrapper.find('input').simulate('change', {
      target: { value },
    });
  });

  describe('onKeyDown', () => {
    describe('when the keycode is 13', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('keyDown', { keyCode: ENTER_KEY, preventDefault: jest.fn()});
      });

      it('creates a new todo', () => {
        const todos = wrapper.find('TodosList').props().todos;
        expect(todos.length).toEqual(1);

        const [todo] = todos;
        expect(todo.title).toEqual(value);
        expect(todo.id).toEqual(123);
      });

      it('resets the value of the input', () => {
        expect(wrapper.find('input').props().value).toEqual('');
      });
    });

    describe('when the keycode is not 13', () => {
      it('does nothing', () => {
        expect(wrapper.find('input').props().value).toEqual(value);
        expect(wrapper.find('TodosList').props().todos.length).toEqual(0);
      });
    });
  });
});
