import { useContext } from 'react';
import MarketContext, { Metrics, SymbolItem } from '../../context/marketContext/marketContext';
import styles from './marketForm.module.css';

interface MarketFormProps {}

const MarketForm = () => {

  const { 
    symbolData, 
    filteredSymbolData, 
    selectedDays,
    symbolOptions, 
    timeGaps, 
    fetchSymbol, 
    setFilteredSymbolData, 
    setSelectedDays ,
    filterMetricsBySelectedDays
  } = useContext(MarketContext);

  return (
    <div>
      <select
        onChange={e => fetchSymbol(e.target.value)}
      >
        <option value="">Select a Symbol...</option>
        {symbolOptions.map((symbol, i) => {
          return (
            <option key={i} value={symbol}>
              {symbol}
            </option>
          );
        })}
      </select>
      <select
        onChange={e => filterMetricsBySelectedDays(Number(e.target.value))}
      >
        {timeGaps.map((gap, i) => {
          return (
            <option key={i} value={gap}>
              {gap}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default MarketForm;
