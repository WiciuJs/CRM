import React, { useState } from 'react';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [nip, setNip] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerData =
     {
      name,
      address: {
        street,
        zipcode,
        city,
      },
      nip,
    };

    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage('Klient został dodany pomyślnie.');
        setName('');
        setStreet('');
        setZipcode('');
        setCity('');
        setNip('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Dodaj klienta</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label>Nazwa:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Ulica:</label>
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
        </div>
        <div>
          <label>Kod pocztowy:</label>
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
        </div>
        <div>
          <label>Miasto:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label>NIP:</label>
          <input type="text" value={nip} onChange={(e) => setNip(e.target.value)} />
        </div>
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default CustomerForm;
