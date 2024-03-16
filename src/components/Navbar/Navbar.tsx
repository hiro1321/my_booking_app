// Navbar.tsx

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Home
        </Link>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='/reservation' className='nav-link'>
              Reservation
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/admin/dashboard' className='nav-link'>
              Admin menu
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
