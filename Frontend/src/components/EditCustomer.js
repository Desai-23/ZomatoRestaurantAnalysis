import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dish_selected: '',
    rating: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/customers`)
      .then(response => {
        const customerData = response.data.find(c => c.id === id);
        if (customerData) {
          setCustomer(customerData);
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/customers/${id}`, customer)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div className="edit-customer">
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={customer.name} onChange={handleChange} required />
        <input type="email" name="email" value={customer.email} onChange={handleChange} required />
        <input type="text" name="phone" value={customer.phone} onChange={handleChange} required />
        <input type="text" name="address" value={customer.address} onChange={handleChange} required />
        <input type="text" name="dish_selected" value={customer.dish_selected} onChange={handleChange} required />
        <input type="number" step="0.1" name="rating" value={customer.rating} onChange={handleChange} required />
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default EditCustomer;