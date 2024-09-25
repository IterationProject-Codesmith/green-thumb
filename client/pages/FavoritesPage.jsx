import React, {useEffect} from 'react'
import FavoritePlantsContainer from '../containers/FavoritePlantsContainer';
import {selectUsername} from "../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites, getFavorites} from '../reducers/favoriteSlice';


const FavoritesPage = () => {
  const username = useSelector(selectUsername);
  const favPlants = useSelector((state) => state.favorites.favPlants);
  const status = useSelector((state) => state.favorites.status);
  const dispatch = useDispatch();

  // on load - dispatch create async thunk
  useEffect(() => {
    if (username){
    dispatch(fetchFavorites(username))
  }
  }, []);


  let favList = [];

  if (status === 'succeeded'){
    
    for (let i =0; i<favPlants.length; i++){
      //iterate through favPlants in state, push to favlist??
      const fav = favPlants[i];
      favList.push(<FavoritePlantCard key={fav.id} {...fav} />);
    }
  }


  return (
    <>
      <h1 className="container">Favorite Plants</h1>
      <section>
        <FavoritePlantsContainer />
      </section>
    </>
  );
}

export default FavoritesPage