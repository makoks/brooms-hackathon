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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="reference" element={<HeroPropertiesReference />} />
          <Route path={`hero/:id`} element={<HeroPropertiesChanging />} />
          <Route path="comparison" element={<Comparison />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
