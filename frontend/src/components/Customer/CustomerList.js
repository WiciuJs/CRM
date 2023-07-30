import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/CustomerList.css'
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
    <h1>Lista klientów</h1>
    <ul>
      {customers.map((customer) => (
        <li key={customer._id}>
          <Link to={`/customer/${customer._id}`}>{customer.name}</Link>
        </li>
      ))}
    </ul>
    <Link to="/add-customer">Dodaj klienta</Link>
  </div>
  );
};

export default CustomerList;


