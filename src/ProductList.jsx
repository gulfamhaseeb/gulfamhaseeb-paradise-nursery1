import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import categories from './plants.js';

function CartIcon({ count }) {
  return (
    <span className="cart-icon" aria-label={`Cart with ${count} items`}>
      <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="80" cy="216" r="12" />
        <circle cx="184" cy="216" r="12" />
        <path d="M42 40h28l24 112h100l24-80H80" />
      </svg>
      <span className="cart-count">{count}</span>
    </span>
  );
}

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [view, setView] = useState('plants'); // 'plants' | 'cart'

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="brand" onClick={onHomeClick}>Paradise Nursery</div>
        <div className="links">
          <a onClick={onHomeClick}>Home</a>
          <a className={view === 'plants' ? 'active' : ''} onClick={() => setView('plants')}>Plants</a>
          <a className={view === 'cart' ? 'active' : ''} onClick={() => setView('cart')}>
            <CartIcon count={totalItems} />
          </a>
        </div>
      </nav>

      {view === 'cart' ? (
        <CartItem onContinueShopping={() => setView('plants')} />
      ) : (
        <div className="page">
          {categories.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="desc">{plant.description}</p>
                    <div className="price">${plant.cost.toFixed(2)}</div>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
