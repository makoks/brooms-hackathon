import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, Page, Home } from './pages';
import { Layout } from './components';
import './light-and-dark-theme.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="page" element={<Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
