import { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import AlgorithmUtil from '../../util/algorithmUtil';

export type MarketContextType = {
  filteredData: SymbolItem;
  selectedDays: number;
  selectedSymbol: string;
  activeAlgorithm: Algorthim,
  symbolOptions: string[];
  timeGaps: number[];
  fetchSymbol: (symbol: string) => void;
  filterMetricsBySelectedDays: (days: number, symbolItem?: SymbolItem) => void
}

export enum Algorthim {
  BASIC = 'basic',
  VOLITILE = 'volitle'
}

export enum RecommendationText {
  BUY = 'buy',
  SELL = 'sell',
  HOLD = 'hold'
}

const defaultSymbolItem = {
  id: null, 
  symbol: '', 
  name: '', 
  recommendation: {
    thresholds: {
      buy: 0,
      sell: 0,
      hold: 0
    },
    text: RecommendationText.HOLD
  }, 
  metrics: []
} as SymbolItem;


const defaultContext = {
  unfilteredData: defaultSymbolItem,
  filteredData: defaultSymbolItem,
  selectedDays: 10,
  selectedSymbol: 'APPL',
  activeAlgorithm: Algorthim.BASIC,
  symbolOptions: ['APPL', 'MSFT', 'AMZN', 'TSLA'],
  timeGaps: [10, 20, 30],
  fetchSymbol: ((symbol: string) => {}),
  filterMetricsBySelectedDays: (() => {})
}

const MarketContext = createContext<MarketContextType>(defaultContext);

// @ts-ignore TODO: SET TYPE FOR CHILDREN
export const MarketProvider = ({ children }) => {

  const [unfilteredData, setUnfilteredData] = useState(defaultContext.unfilteredData);
  const [filteredData, setFilteredData] = useState(defaultContext.filteredData);
  const [selectedDays, setSelectedDays] = useState(defaultContext.selectedDays);
  const [selectedSymbol, setSelectedSymbol] = useState(defaultContext.selectedSymbol);
  const [activeAlgorithm, setActiveAlgorithm] = useState(defaultContext.activeAlgorithm);

  const symbolOptions = defaultContext.symbolOptions;
  const timeGaps = defaultContext.timeGaps;

  useEffect(() => {
    fetchSymbol(defaultContext.selectedSymbol)
  }, [])

  /**
   * Calls the backend /market API to receive the data for the given symbol
   * @param symbol - a string representing a symbol's name
   */
  const fetchSymbol = async (symbol: string): Promise<void> => {
    const response = await fetch(`/market?symbol=${symbol}`);
    const data = await response.json();
    const filteredData = {...data[0]};

    setSelectedSymbol(symbol);
    setUnfilteredData(data[0]);
    filterMetricsBySelectedDays(selectedDays, filteredData);

    filteredData.recommendation = getStockRecommendation(filteredData.rating);

    setFilteredData(filteredData);
  }

  /**
   * Takes in a numerical representation of the number of days to filter the
   * symbol's price history by
   * @param days - the number of days to filter the price history by
   * @param symbolItem - the data for the selected symbol
   */
  const filterMetricsBySelectedDays = (
    days: number=selectedDays, 
    symbolItem?: SymbolItem
  ): void => {
    if (!symbolItem) {
      symbolItem = {...unfilteredData}
    }

    symbolItem.metrics = symbolItem.metrics.slice(symbolItem.metrics.length - days);
    symbolItem.recommendation = getStockRecommendation(symbolItem.metrics);

    setSelectedDays(days);
    setFilteredData(symbolItem);
  }

  /**
   * Gets the recommendation object for the selected symbol based on the 
   * active algorithm
   * @param metrics - the metrics for the selected symbol
   * @returns a recommendation object containing thresholds and a string
   */
  const getStockRecommendation = (metrics: Metrics[]): Recommendation => {
    switch(activeAlgorithm) {
      case Algorthim.VOLITILE:
        return AlgorithmUtil.calculateVolitileRecommendation(metrics);
        break;
      
      case Algorthim.BASIC:
        return AlgorithmUtil.calculateBasicRecommendation(metrics);
        break;

      default: 
        return AlgorithmUtil.calculateBasicRecommendation(metrics);
        break;
    }
  }

  return (
    <MarketContext.Provider
      value={{
        filteredData,
        selectedDays,
        selectedSymbol,
        activeAlgorithm,
        symbolOptions,
        timeGaps,
        fetchSymbol,
        filterMetricsBySelectedDays
      }}
    >
      {children}
    </MarketContext.Provider>
  )
}

export type SymbolItem = {
  id: number | null;
  symbol: string;
  name: string;
  recommendation: Recommendation;
  metrics: Metrics[]
}

export type Recommendation = {
  thresholds: Thresholds;
  text: RecommendationText.BUY | RecommendationText.SELL | RecommendationText.HOLD
}

export type Thresholds = {
  buy: number;
  sell: number;
  hold: number;
}

export interface Metrics {
  date: Date;
  price: number;
  posts: number;
}

export default MarketContext;
