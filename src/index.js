import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import RecipeSearch from './RecipeSearch';
import RecipeDetails from './RecipeDetails'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RecipeSearch />} /> 
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
