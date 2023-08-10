import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import Auth from '../src/components/Action/Auth';
import './components/style/App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {token ? (
              <>
                <li>
                  <Link to="/customer-list">STRONA GŁÓWNA</Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleLogout}>WYLOGUJ</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">ZALOGUJ</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/customer-list" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Auth onLogin={handleLogin} />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customer/:customerId" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
