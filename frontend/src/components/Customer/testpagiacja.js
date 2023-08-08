import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedCustomerData, setEditedCustomerData] = useState({
    name: '',
    address: {
      street: '',
      zipcode: '',
      city: '',
    },
    nip: '',
  });
  
  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/customers/?page=${currentPage}`);
      setCustomers(response.data.customers || []);
      setTotalPages(response.data.totalPages);
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

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/customers/${customerId}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error.message);
    }
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Link to="/add-customer" className="btn btn-primary mt-4">Dodaj klienta</Link>
    </div>
  );
};

export default CustomerList;
