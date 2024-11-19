import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:5000/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Dish Selected</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.dish_selected}</td>
              <td>{customer.rating}</td>
              <td>
                <Link to={`/edit/${customer.id}`}><button>Edit</button></Link>
                <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;