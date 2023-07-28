import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [nip, setNip] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, company, nip }),
      });
      const data = await response.json();
      console.log('Nowy klient dodany:', data);
      history.push('/');
    } catch (error) {
      console.error('Błąd podczas dodawania klienta:', error.message);
    }
  };

  return (
    <div>
      <h1>Dodaj klienta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Adres:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Firma/Osoba:</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <label>NIP:</label>
          <input type="text" value={nip} onChange={(e) => setNip(e.target.value)} />
        </div>
        <button type="submit">Dodaj klienta</button>
      </form>
    </div>
  );
};

export default CustomerForm;
