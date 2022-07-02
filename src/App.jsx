import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  History,
  Comparison,
  HeroPropertiesChanging,
  HeroPropertiesReference,
} from './pages';
import { Layout } from './components';
import './light-and-dark-theme.css';
import './App.css';

const compareList = JSON.parse(localStorage.getItem('compareList'))
export const CompareContext = React.createContext(compareList)

function App() {
  return (
    <BrowserRouter>
      <CompareContext.Provider value={compareList}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="reference" element={<HeroPropertiesReference />} />
            <Route path={`hero/:id`} element={<HeroPropertiesChanging />} />
            <Route path="comparison" element={<Comparison />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      </CompareContext.Provider>
    </BrowserRouter>
  );
}

export default App;
