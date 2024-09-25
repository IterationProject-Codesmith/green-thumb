import React from 'react';
import FavoritePlantCard from '../components/FavoritePlantCard';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import favoriteSlice from '../reducers/favoriteSlice';
// import { useState } from 'react';
// import { setLoggedIn } from '../reducers/userSlice';

const FavoritePlantsContainer = () => {
  // const [favPlants, setPlants] = useState([]);
  const favoritePlants = useSelector((state) => state.favorites.favPlants);
  // iterate over favoritePlants array
  // for each item in favoritePlants, create a new SearchedPlantCard component
  // useEffect(() => {
  const favPlantsArr = [];
  for (let i = 0; i < favoritePlants.length; i++) {
    const plant = favoritePlants[i];
    favPlantsArr.push(<FavoritePlantCard key={plant.id} {...plant} />);
  }
  // setPlants(plantResults);
  // }, [favoritePlants]);
  return <div id='favorite-plants-container'>{favPlantsArr}</div>;
};















export default FavoritePlantsContainer;