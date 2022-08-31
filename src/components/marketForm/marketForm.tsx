import { useContext } from 'react';
import MarketContext from '../../context/marketContext/marketContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './marketForm.module.css';

const MarketForm = () => {
  const { 
    selectedDays,
    selectedSymbol,
    symbolOptions, 
    timeGaps,
    fetchSymbol,
    filterMetricsBySelectedDays
  } = useContext(MarketContext);

  return (
    <div className={styles.MarketForm}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 2, width: '10%'}}>
          <InputLabel id='select-symbol-input'>Symbol</InputLabel>
          <Select
            labelId='select-symbol-input'
            id='symbol-select'
            value={selectedSymbol}
            label='Symbol'
            onChange={e => fetchSymbol(e.target.value)}
          >
            {symbolOptions.map((symbol, i) => {
              return (<MenuItem key={i} value={symbol}>{symbol}</MenuItem>);
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, width: '10%' }}>
          <InputLabel id='select-days-input'>Days</InputLabel>
          <Select
            labelId='select-days-label'
            id='DaysSelect'
            value={selectedDays}
            label='Days'
            color='secondary'
            onChange={e => filterMetricsBySelectedDays(Number(e.target.value))}
          >
            {timeGaps.map((gap, i) => {
              return (<MenuItem key={i} value={gap}>{gap}</MenuItem>);
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default MarketForm;
