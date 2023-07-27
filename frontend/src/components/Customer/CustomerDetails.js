import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/customers/${customerId}`);
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error.message);
      }
    };

    fetchData();
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{customer.name}</h1>
      <p>Adres: {customer.address}</p>
      {customer.company && <p>Firma/Osoba: {customer.company}</p>}
      {customer.nip && <p>NIP: {customer.nip}</p>}
      <h2>Akcje</h2>
      <ul>
        {}
      </ul>
      <a href={`/add-action/${customerId}`}>Dodaj akcję</a>
    </div>
  );
};

export default CustomerDetails;
