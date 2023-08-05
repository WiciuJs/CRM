import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import './components/style/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">LOGIN</Link>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;