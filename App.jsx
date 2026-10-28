import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where green meets serenity. Houseplants chosen to make any room feel alive.</p>
            <button className="get-started-btn" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
            <div className="landing-about">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
