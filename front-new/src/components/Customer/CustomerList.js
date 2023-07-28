import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
