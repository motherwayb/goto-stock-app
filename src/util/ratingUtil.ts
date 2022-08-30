import { Metrics } from "../context/marketContext/marketContext";

export default class RatingUtil {

    /**
     * Here I used a basic algorithm for calculating the standard devation between
     * the stock prices to determine market volatility.
     * The higher the return value is, the more volatile the symbol is.
     * @param metrics {Metrics[]} - the metrics associated with a symbol
     * @returns Number - the standard deviation value for the given metrics
    */
    static calculateStockPriceStandardDeviation(metrics: Metrics[]) {
        const prices: number[] = metrics.map(metric => {
            return metric.price
        });

        const simpleMovingAverage = this.calculateSimpleMovingAverage(prices);
        const deviancySum = this.calculateDeviancyOfNumbersFromSimpleMovingAverage(
            simpleMovingAverage, 
            prices
        );
        return Math.sqrt(deviancySum);
    }

    /**
     * The Simple Moving Average (SMA) is a way of determing the moving average of a
     * group of numbers. 
     * The higher the return value is, the more volatile the symbol is.
     * @param metrics {Metrics[]} - the metrics associated with a symbol
     * @returns Number - the standard deviation value for the given metrics
    */
    static calculateSimpleMovingAverage(numbers: number[], period: number=4) {
        const average = this.calculateSumOfNumbers(numbers) / (numbers.length + 1);
        const simpleMovingAverage = numbers.map((val: number | null, index, arr) => {
            if (index < period) {
                return null;
            } else {
                const arrSlice = arr.slice(index-period, index);
                return this.calculateAverage(arrSlice);
            }
        })
    }

    static calculateDeviancyOfNumbersFromSimpleMovingAverage(simpleMovingAverage: number, numbers: number[]) {
        let deviancyArray: number[] = [];
        numbers.map((num) => {
            return deviancyArray.push((num - simpleMovingAverage) * 2)
        });
        return this.calculateAverage(deviancyArray);
    }

    static calculateAverage(numbers: number[]) {
        return this.calculateSumOfNumbers(numbers) / (numbers.length+1);
    }

    static calculateSumOfNumbers(numbers: number[]): number {
        return numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
}