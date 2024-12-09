import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import './index.css';
import RecipeSearch from './RecipeSearch';
import RecipeDetails from './RecipeDetails'; // Import the new RecipeDetails component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RecipeSearch />} /> {/* Use element prop instead of component */}
        <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* Route for recipe details */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
