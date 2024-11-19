// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddCustomer = () => {
//   const [customer, setCustomer] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     dish_selected: '',
//     rating: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCustomer({ ...customer, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/customers', customer)
//       .then(() => navigate('/'))
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="add-customer">
//       <h2>Add Customer</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
//         <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
//         <input type="text" name="dish_selected" placeholder="Dish Selected" onChange={handleChange} required />
//         <input type="number" step="0.1" name="rating" placeholder="Rating" onChange={handleChange} required />
//         <button type="submit">Add Customer</button>
//       </form>
//     </div>
//   );
// };

// export default AddCustomer;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dish_selected: '',
    rating: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/customers', customer)
      .then(() => {
        setSuccess('Customer added successfully!');
        setError('');
        setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds
      })
      .catch(err => {
        setError('Error adding customer. Please try again.');
        setSuccess('');
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Customer</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone">Phone</label>
          <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" name="address" placeholder="Address" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dish_selected">Dish Selected</label>
          <input type="text" className="form-control" name="dish_selected" placeholder="Dish Selected" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="rating">Rating</label>
          <input type="number" step="0.1" className="form-control" name="rating" placeholder="Rating" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
