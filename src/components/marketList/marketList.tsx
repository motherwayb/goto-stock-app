import{ useContext } from 'react';
import MarketContext from '../../context/marketContext/marketContext';
import styles from './marketList.module.css';
import moment from 'moment';

export const MarketList = () => {

  const { filteredSymbolData } = useContext(MarketContext);

  return <div className={styles.MarketList} data-testid="MarketList">
    <div key={filteredSymbolData.symbol}>
      <table>
        {filteredSymbolData.metrics.map(function(metric, i) {
          return <tr>
            <td>{moment(new Date(metric.date)).format('YYYY-MM-DD')}</td>
            <td className='symbol'>{filteredSymbolData.symbol}</td>
            <td className='posts'>{metric.posts}</td>
            <td className='price'>{metric.price}</td>
          </tr>
        })}
      </table>
    </div>
  </div>
};

export default MarketList;
