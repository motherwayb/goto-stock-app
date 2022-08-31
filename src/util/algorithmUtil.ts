import { Metrics, RecommendationText, Recommendation, Thresholds } from '../context/marketContext/marketContext';

export default class AlgorithmUtil {

  /**
   * calculates the thresholds for a given symbol and uses them to assign
   * a string recommendation text to the symbol
   * @param metrics {Metrics[]} - the metrics associated with a symbol
   * @returns the Recommendation object for the given symbol's metrics
   * NOTE: The Recommendation object contains the threshold values 
   * and recommendation text (buy/sell/hold) for the chosen symbol
   */
  static calculateBasicRecommendation(metrics: Metrics[]): Recommendation {
    const todaysMetrics = metrics[metrics.length - 1];
    const prices: number[] = metrics.map(metric => {
      return metric.price
    });
    const marketAveragePrice = this.calculateAverage(prices);

    return {
      thresholds: this.applyThresholds(marketAveragePrice),
      text: this.getRecommendationText(marketAveragePrice, todaysMetrics.price)
    }
  }

  /**
   * Gets the display text to be shown to the user on what they should do with
   * the chosen stock symbol
   * @param averagePrice {number} - the average stock price for the symbol
   * @param comparisonPrice {number} - the price to be compared with the average
   * @returns a text string that's either buy, sell, or hold
   */
   static getRecommendationText(
    averagePrice: number, 
    comparisonPrice: number
  ): RecommendationText.BUY | RecommendationText.HOLD | RecommendationText.SELL {
    const floorComparisonPrice = Math.floor(comparisonPrice);
    const floorAveragePrice = Math.floor(averagePrice);
    
    if (floorComparisonPrice <= (floorAveragePrice - 10)) {
      return RecommendationText.BUY;
    }
    if (floorComparisonPrice >= (floorAveragePrice + 10)) {
      return RecommendationText.SELL;
    }
    return RecommendationText.HOLD;
  }

  /**
   * Assigns a number value to each of the 3 thresholds
   * @param averageValue {number} - an average value that the threshold 
   * should be determined from
   * @returns {Thresholds} - the Thresholds object
   */
  static applyThresholds(averageValue: number): Thresholds {
    return {
      buy: (averageValue - 10),
      hold: (averageValue),
      sell: (averageValue + 10)
    }
  }

  /**
   * NOTE: This was an algorithm I was trying to develop using a more 
   * advanced formula. I was unable to finish it so the values returned
   * are unfortunately hardcoded. All remaing methods below are 
   * associated with this algorithm
   * @param metrics {Metrics[]} - the metrics for the chosen symbol
   * @returns {Recommendation}
   */

   static calculateVolitileRecommendation(metrics: Metrics[]): Recommendation {
    const todaysMetrics = metrics[metrics.length - 1];
    return {
      thresholds: this.applyThresholds(50),
      text: this.getRecommendationText(50, todaysMetrics.price)
    }

  }

  /**
   * Here I used a standard deviation algorithm for calculating the standard devation between
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
    const simpleMovingAverage = numbers.map((val: number | null, index, arr) => {
      if (index < period) {
        return null;
      } else {
        const arrSlice = arr.slice(index-period, index);
        return this.calculateAverage(arrSlice);
      }
    })
    return simpleMovingAverage;
  }

  /**
   * Calculates the deviancy of each price from the corresponding moving average
   * @param simpleMovingAverage - the moving average of a group of numbers
   * @param numbers - a group of numbers
   * @returns the average of the sum of all deviancies
   */
  static calculateDeviancyOfNumbersFromSimpleMovingAverage(simpleMovingAverage: any[], numbers: number[]): number {
    let deviancyArray: number[] = [];
    numbers.map((num, index) => {
      return deviancyArray.push((num - simpleMovingAverage[index]) * 2)
    });
    return this.calculateAverage(deviancyArray);
  }

  /**
   * Calculates the average of a given numbers a Array
   * @param numbers - array of numbers to be averaged
   * @returns the average value of the given numbers Array
   */
  static calculateAverage(numbers: number[]): number {
    return this.calculateSumOfNumbers(numbers) / (numbers.length+1);
  }

  /**
   * Adds up all of the numbers in a given Array
   * @param numbers - an array of numbers to be summed
   * @returns the total sum of the given numbers array
   */
  static calculateSumOfNumbers(numbers: number[]): number {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
  }
}