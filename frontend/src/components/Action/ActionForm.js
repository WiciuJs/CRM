import React, { useState } from 'react';
import axios from 'axios';

const ActionForm = ({ customerId }) => {
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/actions/${customerId}`, {
        date,
        type,
        description,
      });
      console.log('New action added:', response.data);
    } catch (error) {
      console.error('Error adding new action:', error.message);
    }
  };

  return (
    <div>
      <h2>Dodaj nową akcję</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Data kontaktu:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Rodzaj akcji:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Opis akcji:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Dodaj akcję</button>
      </form>
    </div>
  );
};

export default ActionForm;
