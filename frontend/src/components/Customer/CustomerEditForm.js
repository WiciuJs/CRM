import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CustomerEditForm = ({ customer }) => {
  const history = useHistory();
  const [editedCustomerData, setEditedCustomerData] = useState({
    name: customer.name,
    address: {
      street: customer.address.street,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
    },
    nip: customer.nip,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCustomerData({
      ...editedCustomerData,
      [name]: value,
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setEditedCustomerData({
      ...editedCustomerData,
      address: {
        ...editedCustomerData.address,
        [name]: value,
      },
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/api/customers/${customer._id}`, editedCustomerData);
      history.push('/'); // Przekierowanie na listę klientów po zapisaniu zmian
    } catch (error) {
      console.error('Error updating customer:', error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="edit-form-container">
      <div className="form-group">
        <label htmlFor="name">Imię i nazwisko</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={editedCustomerData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="street">Ulica</label>
        <input
          type="text"
          className="form-control"
          name="street"
          value={editedCustomerData.address.street}
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="zipcode">Kod pocztowy</label>
        <input
          type="text"
          className="form-control"
          name="zipcode"
          value={editedCustomerData.address.zipcode}
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">Miasto</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={editedCustomerData.address.city}
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nip">NIP</label>
        <input
          type="text"
          className="form-control"
          name="nip"
          value={editedCustomerData.nip}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-success mr-2">Zapisz zmiany</button>
        <button type="button" onClick={() => history.push('/')} className="btn btn-secondary">Anuluj</button>
      </div>
    </form>
  );
};

export default CustomerEditForm;
