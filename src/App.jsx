import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Cart from './components/Cart'
import Home from './components/Home';
import { useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const saveCart = localStorage.getItem('movieCart');
    if (saveCart) {
      return JSON.parse(saveCart);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('movieCart', JSON.stringify(cart));
  }, [cart]);

  const updateCart = (movie) => {
    setCart((prevCart) => [...prevCart, movie]);
  }

  const removeCartById = (id) => {
    const updatedCart = cart.filter(c => c.id !== id);
    setCart(updatedCart);
  }

  const removeCart = () => {
    setCart([]);
  }

  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" href='/'>Movie Shop</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">{cart.length} Items</span>
                <span className="text-info">Total : {formattedTotalPrice}$</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block" onClick={() => navigate('/cart')}>View cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home cart={cart} updateCart={updateCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeCartById={removeCartById} totalPrice={formattedTotalPrice} removeCart={removeCart} />} />
      </Routes>
      <footer className="mt-20 footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2023 - All right reserved by Theppakorn</p>
        </aside>
      </footer>
    </>
  )
}

export default App
