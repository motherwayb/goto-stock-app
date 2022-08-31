
import{ useContext } from 'react';
import MarketContext from '../../context/marketContext/marketContext';
import styles from './marketRecommendation.module.css';

const MarketRecommendation = () => {

  const { filteredData } = useContext(MarketContext);

  return <div className={styles.MarketRecommendation} data-testid='MarketRecommendation'>
    <div key='`${filteredSymbolData.symbol}`-recommendation'>
      <>
        <span className={styles.SymbolName}>{filteredData.symbol}: </span>
        <div className={styles.Chip + ' ' + styles[filteredData.recommendation.text]}>
          {filteredData.recommendation.text}
        </div>
      </>
    </div>
  </div>
};

export interface ThresholdClasses {
  buy: 'primary';
  sell: 'secondary';
  hold: 'info';
}

export default MarketRecommendation;
