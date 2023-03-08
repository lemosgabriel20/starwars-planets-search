import React from 'react';
import { render, cleanup, screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

jest.mock('../__mocks__/fetchThis', () => {
  const result = 'teste';
  return {
    meals: jest.fn().mockImplementation(() => [{name: result}]),
  };
});

afterEach(() => {
  cleanup();
  window.history.pushState({}, '', '/');
  delete window.location;
  // @ts-ignore
  window.location = new URL('http://localhost/');
});

test('Testa input texto', async () => {
  render(<App />);
  await new Promise(() => setTimeout(userEvent.type(screen.getByTestId('name-filter'), 'a')), 2000);
});

test('Testa input dropdown menor que', async () => {
  render(<App />);
  userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
  userEvent.type(screen.getByTestId('value-filter'), '12');
  userEvent.click(screen.getByTestId('button-filter'));
  userEvent.click(screen.getByText('X'));
  
});

test('Testa input dropdown maior que', async () => {
  render(<App />);
  userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  userEvent.type(screen.getByTestId('value-filter'), '12');
  userEvent.click(screen.getByTestId('button-filter'));
});

test('Testa input dropdown igual a', async () => {
  act(() => {
    render(<App />);
  })
  userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  userEvent.type(screen.getByTestId('value-filter'), '12');
  userEvent.click(screen.getByTestId('button-filter'));
  userEvent.click(screen.getByText('Remove Filters'));
});