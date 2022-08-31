import AlgorithmUtil from './algorithmUtil';
import { expect } from 'chai';
import { Metrics } from '../context/marketContext/marketContext';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('RatingUtil', () => {

  describe('calculateBasicRecommendation', () => {
    it('should hold the stock if the price is steadily rising', () => {
      const metrics = [
        {price: 10, date: new Date(), posts: 10},
        {price: 11, date: new Date(), posts: 10},
        {price: 12, date: new Date(), posts: 10},
        {price: 13, date: new Date(), posts: 10},
        {price: 14, date: new Date(), posts: 10},
        {price: 15, date: new Date(), posts: 10},
        {price: 16, date: new Date(), posts: 10}
      ];
      const recommendation = AlgorithmUtil.calculateBasicRecommendation(metrics);
      expect(recommendation.text).eql('hold');
    });

    it('Should recommend to sell the stock if the last price is greater than the average price', () => {
      const metrics = [
        {price: 20, date: new Date(), posts: 10},
        {price: 40, date: new Date(), posts: 10},
        {price: 60, date: new Date(), posts: 10},
        {price: 100, date: new Date(), posts: 10},
        {price: 60, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10}
      ];
      const recommendation = AlgorithmUtil.calculateBasicRecommendation(metrics);
      expect(recommendation.text).eql('sell');
    });

    it('Should recommend to buy the stock if its a lower price than it usually is', () => {
      const metrics = [
        {price: 60, date: new Date(), posts: 10},
        {price: 70, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10},
        {price: 90, date: new Date(), posts: 10},
        {price: 70, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10},
        {price: 10, date: new Date(), posts: 10}
      ];
      const recommendation = AlgorithmUtil.calculateBasicRecommendation(metrics);
      expect(recommendation.text).eql('buy');
    });

    it('Should recommend to hold the a good stock if it dips for a bit', () => {
      const metrics = [
        {price: 90, date: new Date(), posts: 10},
        {price: 100, date: new Date(), posts: 10},
        {price: 90, date: new Date(), posts: 10},
        {price: 10, date: new Date(), posts: 10},
        {price: 10, date: new Date(), posts: 10},
        {price: 10, date: new Date(), posts: 10},
        {price: 40, date: new Date(), posts: 10}
      ];
      const recommendation = AlgorithmUtil.calculateBasicRecommendation(metrics);
      expect(recommendation.text).eql('hold');
    });

    it('Should recommend to sell the stock if the price is unusually high', () => {
      const metrics = [
        {price: 50, date: new Date(), posts: 10},
        {price: 40, date: new Date(), posts: 10},
        {price: 50, date: new Date(), posts: 10},
        {price: 40, date: new Date(), posts: 10},
        {price: 50, date: new Date(), posts: 10},
        {price: 40, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10}
      ];
      const recommendation = AlgorithmUtil.calculateBasicRecommendation(metrics);
      expect(recommendation.text).eql('sell');
    });
  });
  describe('calculateVolatileStockRating', () => {
    it('steady price rise should yield a rating lower than 5', () => {
      const metrics = [
        {price: 10, date: new Date(), posts: 10},
        {price: 11, date: new Date(), posts: 10},
        {price: 12, date: new Date(), posts: 10},
        {price: 13, date: new Date(), posts: 10},
        {price: 14, date: new Date(), posts: 10},
        {price: 15, date: new Date(), posts: 10},
        {price: 16, date: new Date(), posts: 10}
      ];
      const rating = AlgorithmUtil.calculateStockPriceStandardDeviation(metrics);
      expect(rating).lessThanOrEqual(5);
    });

    it('medium price volatility should yield a rating higher than 5 but lower than 10', () => {
      const metrics = [
        {price: 20, date: new Date(), posts: 10},
        {price: 40, date: new Date(), posts: 10},
        {price: 60, date: new Date(), posts: 10},
        {price: 100, date: new Date(), posts: 10},
        {price: 60, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10},
        {price: 80, date: new Date(), posts: 10}
      ];
      const rating = AlgorithmUtil.calculateStockPriceStandardDeviation(metrics);
      expect(rating).greaterThan(5);
      expect(rating).lessThanOrEqual(10);
    });

    it('high price volatility should yield a number greater than 10', () => {
      const metrics = [
        {price: 10, date: new Date(), posts: 10},
        {price: 100, date: new Date(), posts: 10},
        {price: 20, date: new Date(), posts: 10},
        {price: 0, date: new Date(), posts: 10},
        {price: 1000, date: new Date(), posts: 10},
        {price: 500, date: new Date(), posts: 10},
        {price: 10, date: new Date(), posts: 10}
      ];
      const rating = AlgorithmUtil.calculateStockPriceStandardDeviation(metrics);
      expect(rating).greaterThan(10);
    });
  });
});