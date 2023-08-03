import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActionList = ({ customerId }) => {
  const [actions, setActions] = useState([]);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchActions();
  }, [customerId]);

  const fetchActions = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/customers/${customerId}/actions`);
      setActions(response.data);
    } catch (error) {
      console.error('Error fetching actions:', error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/customers/${customerId}/actions`, {
        date,
        type,
        description,
      });
      console.log('New action added:', response.data);
      fetchActions();
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

      <h2>Lista akcji dla klienta</h2>
      <ul>
        {actions.map((action) => (
          <li key={action._id}>
            <p>Data kontaktu: {action.date}</p>
            <p>Rodzaj akcji: {action.type}</p>
            <p>Opis akcji: {action.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionList;
