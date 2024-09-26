import React from "react";
import FavoritePlantCard from "../components/FavoritePlantCard";
import { useSelector } from "react-redux";
import favoriteSlice from "../reducers/favoriteSlice";

const FavoritePlantsContainer = () => {
  const status = useSelector((state) => state.favorites.status);
  const favoritePlants = useSelector((state) => state.favorites.favPlants);
  console.log("state", favoritePlants);

  //  if (status === 'succeeded'){

  // iterate over favoritePlants array
  // for each item in favoritePlants, create a new SearchedPlantCard component
  const favPlantsArr = [];
  for (let i = 0; i < favoritePlants.length; i++) {
    // console.log(`in container loop: ${favoritePlants}`);
    const plant = favoritePlants[i];
    favPlantsArr.push(<FavoritePlantCard key={plant.id} {...plant} />);
  }
  // }
  // setPlants(plantResults);
  // }, [favoritePlants]);
  return (
    <>
      <div id="favorite-plants-container">{favPlantsArr}</div>
    </>
  );
};

export default FavoritePlantsContainer;
