import './App.css';
import { MarketProvider } from './context/marketContext/marketContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketList from './components/marketList/marketList';
import MarketForm from './components/marketForm/marketForm';
import MarketChart from './components/marketChart/marketChart';
import MarketRecommendation from './components/marketRecommendation/marketRecommendation';
import Header from './components/header/header';

function App() {

  return (
    <MarketProvider>
      <Router>
        <><Header /></>
        <div className='container'>
          <Routes>
            <Route 
              path='/'
              element={
                <>
                  <MarketForm />
                  <MarketRecommendation />
                  <MarketChart />
                  <MarketList />
                </>
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </MarketProvider>
  );
}

export default App;
