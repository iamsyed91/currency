import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../src/App';

// Create a mock adapter for the axios library
const mockAxios = new MockAdapter(axios);

// Mock the response from the API endpoint
const apiResponse = {
  base: 'USD',
  date: '2023-03-19',
  rates: {
    EUR: 0.840312,
    GBP: 0.72185,
    JPY: 94.582215,
    AUD: 1.312085,
  },
};
mockAxios.onGet('https://api.exchangeratesapi.io/latest?base=USD').reply(200, apiResponse);

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays a Switch component', () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText('EUR')).toBeInTheDocument();
    expect(getByLabelText('USD')).toBeInTheDocument();
  });

  it('displays a Converter component', () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText('Enter USD amount:')).toBeInTheDocument();
    expect(getByLabelText('Override FX Rate:')).toBeInTheDocument();
  });

  it('displays a Table component with a row for the realtime rate', async () => {
    const { findByText } = render(<App />);
    expect(await findByText('Realtime Rate')).toBeInTheDocument();
    expect(await findByText('0.840312')).toBeInTheDocument();
  });

  it('displays a Table component with rows for previous conversions', async () => {
    const { findByText } = render(<App />);
    fireEvent.change(getByLabelText('Enter USD amount:'), { target: { value: '100' } });
    fireEvent.change(getByLabelText('Override FX Rate:'), { target: { value: '0.9' } });
    fireEvent.click(getByLabelText('EUR'));
    fireEvent.click(getByLabelText('USD'));
    fireEvent.click(getByLabelText('EUR'));
    expect(await findByText('Realtime Rate')).toBeInTheDocument();
    expect(await findByText('0.840312')).toBeInTheDocument();
    expect(await findByText('0.9')).toBeInTheDocument();
    expect(await findByText('100 USD')).toBeInTheDocument();
    expect(await findByText('84.03 EUR')).toBeInTheDocument();
    expect(await findByText('84.03 EUR')).toBeInTheDocument();
    expect(await findByText('93.37 USD')).toBeInTheDocument();
  });
});