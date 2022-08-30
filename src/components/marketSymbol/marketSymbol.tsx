import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styles from './marketSymbol.module.css';
import { Metrics, SymbolItem } from '../../context/marketContext/marketContext';
import { symbolName } from 'typescript';
import moment from 'moment';

const dateToday = new Date();

type SymbolProps = {
  data: SymbolItem;
}

const MarketSymbol = ({ data }: SymbolProps) => {

  return (
    <div 
      className='row' 
      data-testid="MarketSymbol"
    >
      
    </div>
  );
}

export default MarketSymbol;
