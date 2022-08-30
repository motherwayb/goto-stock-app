import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MarketSymbol from './marketSymbol';

describe('<MarketSymbol />', () => {
  test('it should mount', () => {
    
    const marketSymbol = screen.getByTestId('MarketSymbol');

    expect(marketSymbol).toBeInTheDocument();
  });
});