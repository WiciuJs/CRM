import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import Auth from '../src/components/Action/Auth'; 
import './components/style/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/">STRONA GŁÓWNA</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customer/:customerId" element={<CustomerDetails />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
