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

    const customerData = {
      name,
      address: {
        street,
        zipcode,
        city,
      },
      nip,
    };

    fetch('http://127.0.0.1:5000/api/customers', {
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
    <div className="container mt-4">
      <h1>Dodaj klienta</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nazwa:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Ulica:</label>
          <input type="text" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Kod pocztowy:</label>
          <input type="text" className="form-control" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Miasto:</label>
          <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>NIP:</label>
          <input type="text" className="form-control" value={nip} onChange={(e) => setNip(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Dodaj</button>
      </form>
    </div>
  );
};

export default CustomerForm;
