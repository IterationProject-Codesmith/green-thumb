import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div id='nav-bar'>
      <Link id='favButton' to='/dashboard/favorites'>Favorite Plants</Link>
      <Link id='searchButton' to='/dashboard/search'>Search Plants</Link>
    </div>
  );
};

export default NavBar;
