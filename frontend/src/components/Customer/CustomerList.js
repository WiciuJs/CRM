import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [editedCustomerData, setEditedCustomerData] = useState({
    name: '',
    address: {
      street: '',
      zipcode: '',
      city: '',
    },
    nip: '',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchCustomers();
    }
  }, [token]);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error.message);
    }
  };

  const filterCustomers = () => {
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filteredCustomers);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomerIdToDelete(customerId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmation(false);
    try {
      await axios.delete(`http://127.0.0.1:5000/api/customers/${customerIdToDelete}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setCustomerIdToDelete(null);
  };


  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer._id);
    setEditedCustomerData(customer);
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
    setEditedCustomerData({
      name: '',
      address: {
        street: '',
        zipcode: '',
        city: '',
      },
      nip: '',
    });
  };

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
      await axios.put(`http://127.0.0.1:5000/api/customers/${editingCustomer}`, editedCustomerData);
      fetchCustomers();
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error.message);
    }
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h1 className="text-center mb-4">Lista klientów</h1>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Wyszukaj klienta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ul className="list-group">
        {filteredCustomers.map((customer) => (
          <li key={customer._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/customer/${customer._id}`}>{customer.name}</Link>
            <div>
              <button className="btn btn-danger mr-2" onClick={() => handleDeleteCustomer(customer._id)}>Usuń</button>
              {editingCustomer === customer._id ? (
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
                    <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">Anuluj</button>
                  </div>
                </form>
              ) : (
                <button className="btn btn-primary" onClick={() => handleEditCustomer(customer)}>Modyfikuj</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź usunięcie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Czy na pewno chcesz usunąć tego użytkownika?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>Anuluj</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Usuń</Button>
        </Modal.Footer>
      </Modal>
      <Link to="/add-customer" className="btn btn-primary mt-4">Dodaj klienta</Link>
    </div>
  );
};

export default CustomerList;