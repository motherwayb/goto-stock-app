import RatingUtil from './ratingUtil';
import { expect } from 'chai';
import { Metrics } from '../context/marketContext/marketContext';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('RatingUtil', () => {
    describe('calculateStockRating', () => {

        it('steady price rise should yield a rating lower than 3', () => {
            const metrics = [
                {price: 10, date: new Date(), posts: 10},
                {price: 11, date: new Date(), posts: 10},
                {price: 12, date: new Date(), posts: 10},
                {price: 13, date: new Date(), posts: 10},
                {price: 14, date: new Date(), posts: 10},
                {price: 15, date: new Date(), posts: 10},
                {price: 16, date: new Date(), posts: 10}
            ];
            const rating = RatingUtil.calculateStockPriceStandardDeviation(metrics);
            console.log(rating);
            expect(rating).lessThanOrEqual(3);
        });

        it('medium price volatility should yield a rating higher than 3 but lower than 7', () => {
            const metrics = [
                {price: 20, date: new Date(), posts: 10},
                {price: 40, date: new Date(), posts: 10},
                {price: 60, date: new Date(), posts: 10},
                {price: 100, date: new Date(), posts: 10},
                {price: 60, date: new Date(), posts: 10},
                {price: 80, date: new Date(), posts: 10},
                {price: 80, date: new Date(), posts: 10}
            ];
            const rating = RatingUtil.calculateStockPriceStandardDeviation(metrics);
            console.log(rating);
            expect(rating).greaterThan(3);
            expect(rating).lessThanOrEqual(6);
        });

        it('high price volatility should yield a number greater than 6', () => {
            const metrics = [
                {price: 10, date: new Date(), posts: 10},
                {price: 100, date: new Date(), posts: 10},
                {price: 20, date: new Date(), posts: 10},
                {price: 0, date: new Date(), posts: 10},
                {price: 1000, date: new Date(), posts: 10},
                {price: 500, date: new Date(), posts: 10},
                {price: 10, date: new Date(), posts: 10}
            ];
            const rating = RatingUtil.calculateStockPriceStandardDeviation(metrics);
            console.log(rating);
            expect(rating).greaterThan(6);
        });
    });
});