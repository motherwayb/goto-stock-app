import{ useContext } from 'react';
import MarketContext from '../../context/marketContext/marketContext';
import styles from './marketList.module.css';
import moment from 'moment';

const MarketList = () => {

  const { filteredData } = useContext(MarketContext);

  return <div className={styles.MarketList} data-testid='MarketList'>
    <div key={filteredData.symbol}>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Symbol</td>
            <td>Media Posts</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.metrics.map(function(metric, i) {
            return <tr key={i}>
              <td>{moment(new Date(metric.date)).utcOffset(60).format('YYYY-MM-DD')}</td>
              <td className='symbol'>{filteredData.symbol}</td>
              <td className='posts'>{metric.posts}</td>
              <td className='price'>{metric.price}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>
};

export default MarketList;
