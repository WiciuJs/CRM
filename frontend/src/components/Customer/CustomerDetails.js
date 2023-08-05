import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionsList from '../Action/ActionsList';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    console.log('Przed pobraniem danych');
    fetch(`http://127.0.0.1:5000/api/customers/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Dane pobrane z serwera:', data);
        setCustomer(data);
      })
      .catch((error) => console.log('Błąd pobierania danych:', error));
  }, [customerId]);

  const handleShowActions = () => {
    setShowActions(true);
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Szczegóły klienta</h1>
      <div className="card">
        <div className="card-body">
          <p className="card-text"><span className="details-label">Nazwa:</span> <strong>{customer.name}</strong></p>
          <p className="card-text"><span className="details-label">Adres:</span> <strong>{customer.address.street}, {customer.address.zipcode} {customer.address.city}</strong></p>
          <p className="card-text"><span className="details-label">NIP:</span> <strong>{customer.nip}</strong></p>
        </div>
      </div>

      <button onClick={handleShowActions} className="btn btn-primary mt-3">Akcje</button>

      {showActions && <ActionsList customerId={customerId} />}
    </div>
  );
};

export default CustomerDetails;
