import { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import RatingUtil from '../../util/ratingUtil';

export type MarketContextType = {
  symbolData: SymbolItem;
  filteredSymbolData: SymbolItem;
  selectedDays: number;
  selectedMediaPosts: number;
  symbolOptions: string[];
  timeGaps: number[];
  fetchSymbol: (symbol: string) => void;
  setFilteredSymbolData: Dispatch<SetStateAction<SymbolItem>>;
  setSelectedDays: Dispatch<SetStateAction<number>>;
  filterMetricsBySelectedDays: (days: number, symbolItem?: SymbolItem) => void
}

const defaultContext = {
  symbolData: {id: null, symbol: '', name: '', rating: 0, recommendation: '', metrics: []} as SymbolItem,
  filteredSymbolData: {id: null, symbol: '', name: '', rating: 0, recommendation: '', metrics: []} as SymbolItem,
  selectedDays: 10,
  selectedMediaPosts: 100,
  symbolOptions: ['APPL', 'MSFT', 'AMZN', 'TSLA'],
  timeGaps: [10, 20, 30],
  fetchSymbol: ((symbol: string) => {}),
  setFilteredSymbolData: (() => {}),
  setSelectedDays: (() => {}),
  filterMetricsBySelectedDays: (() => {})
}

const MarketContext = createContext<MarketContextType>(defaultContext);

// @ts-ignore TODO: SET TYPE FOR CHILDREN
export const MarketProvider = ({ children }) => {

  const [symbolData, setSymbolData] = useState(defaultContext.symbolData);
  const [filteredSymbolData, setFilteredSymbolData] = useState(defaultContext.filteredSymbolData);
  const [selectedDays, setSelectedDays] = useState(defaultContext.selectedDays);
  const [selectedMediaPosts, setSelectedMediaPosts] = useState(defaultContext.selectedMediaPosts);
  const symbolOptions = defaultContext.symbolOptions;
  const timeGaps = defaultContext.timeGaps;

  const fetchSymbol = async (symbol: string): Promise<void> => {
    const response = await fetch(`/market?symbol=${symbol}`);
    const data = await response.json();
    setSymbolData(data[0]);

    const filteredData = {...data[0]};
    filterMetricsBySelectedDays(selectedDays, filteredData);

    console.log(filteredData);

    filteredData.rating = getStockRating(filteredData.metrics);
    filteredData.recommedation = getRecommendationFromRating(filteredData.rating);
    
    setFilteredSymbolData(filteredData);
  }

  const filterMetricsBySelectedDays = (
    days: number=selectedDays, 
    symbolItem?: SymbolItem
  ): void => {
    if (!symbolItem) {
      symbolItem = {...symbolData}
    }
    symbolItem.metrics = symbolItem.metrics.filter((metric, index) => index < days);
    setSelectedDays(days);
    setFilteredSymbolData(symbolItem);
  }

  const getStockRating = (metrics: Metrics[]) => {
    return RatingUtil.calculateStockPriceStandardDeviation(metrics);
  }

  const getRecommendationFromRating = (rating: number): string => {
    if (rating < 3) {
      return 'BUY';
    }
    if (rating < 6) {
      return 'HOLD';
    }
    return 'SELL';
  }

  return (
    <MarketContext.Provider
      value={{
        symbolData,
        filteredSymbolData,
        selectedDays,
        selectedMediaPosts,
        symbolOptions,
        timeGaps,
        fetchSymbol,
        setFilteredSymbolData,
        setSelectedDays,
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
  rating: number;
  recommendation: string;
  metrics: Metrics[]
}

export interface Metrics {
  date: Date;
  price: number;
  posts: number;
}

export default MarketContext;
