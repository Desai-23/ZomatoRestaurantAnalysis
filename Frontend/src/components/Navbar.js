import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Restaurant Customer Management</h1>
      <ul>
        <li className='buttons'><Link to="/add">Add Customer</Link></li>
        <li className='buttons'><Link to="/restaurant">Restaurant Details</Link></li>
        <li className='buttons'>
          <a href="http://127.0.0.1:8080" rel="noopener noreferrer">Check your Popularity</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
