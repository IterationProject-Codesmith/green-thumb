import React from 'react';
import NavBar from '../components/NavBar';
import { Routes, Route } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage';
import SearchPage from '../pages/SearchPage';

const DashBoard = () => {
  return (
    <div id='dashboard'>
      <NavBar />
      <Routes>
        <Route path='favorites' element={<FavoritesPage />}></Route>
        <Route path='search' element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
};

export default DashBoard;


