import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/CustomerList.css';
import '../style/Buttons.css';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editedCustomerData, setEditedCustomerData] = useState({
    name: '',
    address: {
      street: '',
      zipcode: '',
      city: '',
    },
    nip: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  useEffect(() => {
    filterCustomers();
  }, [searchTerm]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/customers');
      setCustomers(response.data);
      setFilteredCustomers(response.data);
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
    <div className="container">
      <h1>Lista klientów</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Wyszukaj klienta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer._id}>
            <Link to={`/customer/${customer._id}`}>{customer.name}</Link>
            <div>
              <button className="delete-btn" onClick={() => handleDeleteCustomer(customer._id)}>Usuń</button>
              {editingCustomer === customer._id ? ( // Jeśli jesteśmy w trybie edycji, wyświetlamy formularz edycji
                <form onSubmit={handleFormSubmit} id="edit-form" className="edit-form-container">
                  <div>
                    <label htmlFor="name">Imię i nazwisko</label>
                    <input
                      type="text"
                      name="name"
                      value={editedCustomerData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="street">Ulica</label>
                    <input
                      type="text"
                      name="street"
                      value={editedCustomerData.address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="zipcode">Kod pocztowy</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={editedCustomerData.address.zipcode}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="city">Miasto</label>
                    <input
                      type="text"
                      name="city"
                      value={editedCustomerData.address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="nip">NIP</label>
                    <input
                      type="text"
                      name="nip"
                      value={editedCustomerData.nip}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <button type="submit" className="edit-btn-green">Zapisz zmiany</button>
                    <button type="button" onClick={handleCancelEdit} className="edit-btn">Anuluj</button>
                  </div>
                </form>
              ) : (
                <button className="edit-btn" onClick={() => handleEditCustomer(customer)}>Modyfikuj</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Link to="/add-customer" className="add-customer-btn">Dodaj klienta</Link>
    </div>
  );
};

export default CustomerList;




