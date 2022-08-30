import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MarketProvider } from './context/marketContext/marketContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketList from './components/marketList/marketList';
import MarketForm from './components/marketForm/marketForm';

function App() {
  return (
    <MarketProvider>
      <Router>
        <div className='container'>
          <Routes>
            <Route 
              path='/'
              element={
                <>
                  <MarketForm />
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
