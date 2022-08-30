let symbolsJSON = require('./symbols.json');
const startDate = new Date("2022-08-01");
const endDate = new Date("2022-08-29"); //today's date

module.exports = () => {
    let data = {market: []};
    for (symbol in symbolsJSON.symbols) {
        data.market.push({...symbolsJSON.symbols[symbol], metrics: getStockMetricsForDates(startDate, endDate)})
    }
    return data;
}

/**
 * Gathers the stock metrics for each date between (and including) a given start/end date
 * @param {Date} startDate - the first date for stock price allocation
 * @param {Date} endDate - the final date for stock price allocation
 * @returns {Array} an object Array where each object contains a date and the stock price for that date
 */
function getStockMetricsForDates(startDate, endDate) {
    let metrics = [];
    let dateIteration = new Date(startDate);
    while (dateIteration <= endDate) {
        metrics.push({
            date: new Date(dateIteration),
            price: getRandomNumber(10, 500),
            posts: getRandomNumber(100, 1000, 0)
        });
        dateIteration.setDate(dateIteration.getDate() + 1);
    }
    return metrics.reverse();
}

/**
 * Uses Math.random to create a random stock price between
 * @param {Number} lowestNumber - the lowest possible value the number can be
 * @param {Number} highestNumber - the highest possible value the number can be
 * @param {Number} decimalPlaces - the number of decimal places the number should go
 * @returns {Number} a deciaml number set to the received decimal places
 */
function getRandomNumber(lowestNumber, highestNumber, decimalPlaces=2) {
    return Number((Math.random() * (highestNumber - lowestNumber + 1) + lowestNumber).toFixed(decimalPlaces));
}