import { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import MarketContext from '../../context/marketContext/marketContext';
import moment from 'moment';

const MarketChart = () => {

  const { filteredData } = useContext(MarketContext);

  /**
   * Offsets the UTC string
   * @param tickItem - the Recharts item value
   * @returns an offset UTC string
   */
  const formatXAxis = (tickItem: any) => {
    return moment(tickItem).utcOffset(60).format('YYYY-MM-DD')
  }
  
  if (filteredData.metrics.length === 0) {
    return <p>'Loading....</p>
  }
  return <ResponsiveContainer width={'100%'} height={600}>
    <LineChart width={730} height={250} data={filteredData.metrics}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='date' tickFormatter={formatXAxis}/>
      <YAxis />
      <Tooltip />
      <ReferenceLine y={filteredData.recommendation.thresholds.buy} label='BUY' stroke='#3CB371' />
      <ReferenceLine y={filteredData.recommendation.thresholds.sell} label='SELL' stroke='#DC143C' />
      <ReferenceLine y={filteredData.recommendation.thresholds.hold} label='HOLD' stroke='#FFD700' />
      <Legend />
      <Line type='monotone' dataKey='price' stroke='#8884d8' />
    </LineChart>
  </ResponsiveContainer>
};

export default MarketChart;
