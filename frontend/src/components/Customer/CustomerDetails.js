import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionForm from '../Action/ActionForm';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetch(`/api/customers/${customerId}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.log(error));

    fetch(`/api/actions/${customerId}`)
      .then((response) => response.json())
      .then((data) => setActions(data))
      .catch((error) => console.log(error));
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Szczegóły klienta</h1>
      <p>Nazwa: {customer.name}</p>
      <p>Adres: {customer.address.street}, {customer.address.zipcode} {customer.address.city}</p>
      <p>NIP: {customer.nip}</p>

      <h2>Akcje</h2>
      <ul>
        {actions.map((action) => (
          <li key={action._id}>
            <p>Data kontaktu: {action.date}</p>
            <p>Rodzaj akcji: {action.type}</p>
            <p>Opis akcji: {action.description}</p>
          </li>
        ))}
      </ul>

      <ActionForm customerId={customerId} />
    </div>
  );
};

export default CustomerDetails;
