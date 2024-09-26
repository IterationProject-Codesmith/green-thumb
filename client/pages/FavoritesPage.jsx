import React, { useEffect } from "react";
import FavoritePlantsContainer from "../containers/FavoritePlantsContainer";
import { selectUsername } from "../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../reducers/favoriteSlice";

const FavoritesPage = () => {
  const username = useSelector(selectUsername);

  const dispatch = useDispatch();

  // on load - dispatch create async thunk
  useEffect(() => {
    console.log(`in useEffect on favorites page`);
    if (username) {
      dispatch(fetchFavorites(username));
    }
  }, []);

  return (
    <>
      <h1 className="container">Favorite Plants</h1>
      <section>
        <FavoritePlantsContainer />
      </section>
    </>
  );
};

export default FavoritesPage;
