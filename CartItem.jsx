import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemTotal = (item) => item.cost * item.quantity;
  const totalAmount = () => items.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // removing the last unit deletes the item
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout is Coming Soon!');
  };

  return (
    <div className="page cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-total-amount">Total Cart Amount: ${totalAmount().toFixed(2)}</div>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add a plant to get started.</p>
      ) : (
        items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h3>{item.name}</h3>
              <div>Unit price: ${item.cost.toFixed(2)}</div>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>−</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
            </div>
            <div className="item-subtotal">${itemTotal(item).toFixed(2)}</div>
            <button className="delete-btn" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        ))
      )}

      <div className="cart-actions">
        <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
