import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import RestaurantManager from './RestaurantManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/add" element={<AddCustomer />} />
          <Route path="/edit/:id" element={<EditCustomer />} />
          <Route path="/restaurant" element={<RestaurantManager />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
