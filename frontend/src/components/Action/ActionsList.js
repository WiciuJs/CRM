import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ActionType = {
  CALL: 'CALL',
  MEETING: 'MEETING',
  MESSAGE: 'MESSAGE',
};

const ActionList = ({ customerId, token }) => {
  const [actions, setActions] = useState([]);
  const [date, setDate] = useState('');
  const [type, setType] = useState(ActionType.CALL); 
  const [description, setDescription] = useState('');
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [isEditingAction, setIsEditingAction] = useState(null);

  useEffect(() => {
    fetchActions();
  }, [customerId, token]);

  const fetchActions = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/actions/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActions(response.data);
    } catch (error) {
      console.error('Error fetching actions:', error.message);
    }
  };

  const handleAddAction = () => {
    setIsAddingAction(true);
    setIsEditingAction(null);
    setDate('');
    setType(ActionType.CALL); 
    setDescription('');
  };

  const handleEditAction = (action) => {
    setIsAddingAction(false);
    setIsEditingAction(action._id);
    setDate(action.date);
    setType(action.type);
    setDescription(action.description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isAddingAction) {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/actions/${customerId}`,
          {
            date,
            type,
            description,
          }
        );
        console.log('New action added:', response.data);
      } else if (isEditingAction) {
        const response = await axios.put(
          `http://127.0.0.1:5000/api/actions/${isEditingAction}`,
          {
            date,
            type,
            description,
          }
        );
        console.log('Action updated:', response.data);
      }
  
      fetchActions();
      setIsAddingAction(false);
      setIsEditingAction(null);
      setDate('');
      setType(ActionType.CALL); 
      setDescription('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteAction = async (actionId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/actions/${actionId}`);
      console.log('Action deleted successfully');
      fetchActions();
    } catch (error) {
      console.error('Error deleting action:', error.message);
    }
  };

  return (
    <div>
      <h2 className="mt-4">Dodaj nową akcję</h2>
      {isAddingAction || isEditingAction ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Data kontaktu:
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Rodzaj akcji:
            </label>
            <select
              id="type"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value={ActionType.CALL}>Call</option>
              <option value={ActionType.MEETING}>Meeting</option>
              <option value={ActionType.MESSAGE}>Message</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Opis akcji:
            </label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isAddingAction ? 'Dodaj akcję' : 'Zapisz zmiany'}
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsAddingAction(false)}>
            Anuluj
          </button>
        </form>
      ) : (
        <button className="btn btn-primary" onClick={handleAddAction}>
          Dodaj nową akcję
        </button>
      )}

      <h2 className="mt-4">Lista akcji dla klienta</h2>
      {actions.length === 0 ? (
        <p>Brak akcji dla tego klienta.</p>
      ) : (
        <ul className="list-group">
          {actions.map((action) => (
            <li key={action._id} className="list-group-item">
              <p>Data kontaktu: {action.date}</p>
              <p>Rodzaj akcji: {action.type}</p>
              <p>Opis akcji: {action.description}</p>
              <div>
                <button className="btn btn-primary mr-2" onClick={() => handleEditAction(action)}>
                  Edytuj
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteAction(action._id)}>
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionList;