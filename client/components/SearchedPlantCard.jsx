import React from 'react';
import { addPlantToFavorites, selectUsername, saveFavoritetoDatabase } from '../reducers/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const SearchedPlantCard = (props) => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  // console.log(username)

  //useSelector
  //dispatch to send this info with username to reducer
  //send info to database - username, plant info (common_name, cycle, watering, sunlight,image url)

  const addToFavorites = (e) => {
    e.preventDefault();
    const plantandUserInfo = {
      userId: username,
      id: props.id,
      common_name: props.common_name,
      cycle: props.cycle,
      watering: props.watering,
      sunlight: props.sunlight,
      image_url: props.default_image ? props.default_image.small_url : ''
    };

    dispatch(addPlantToFavorites(plantandUserInfo));
    dispatch(saveFavoritetoDatabase(plantandUserInfo));
    // console.log(plantandUserInfo)
  };

  return (
    <>
      <div className="searched-plant-card">
        {props.default_image ? (
          <img src={props.default_image.small_url}></img>
        ) : (
          <img alt={props.common_name}></img>
        )}
        <div className="searched-plant-card-content">
          <h3>{props.common_name}</h3>
          {/* <p>
       <em>Type: </em>
       {props.type}
     </p> */}
          <p>
            <em>Cycle: </em>
            {props.cycle}
          </p>
          <p>
            <em>Watering: </em>
            {props.watering}
          </p>
          <p>
            <em>Sunlight: </em>
            {props.sunlight}
          </p>
          {props.care_level ? (
            <p>
              <em>Care Level: </em>
              {props.care_level}
            </p>
          ) : (
            //have logic to see if its there
            <p></p>
          )}
        </div>
        <button onClick={addToFavorites} id="favorite">Add to favorites</button>
      </div>
    </>
  );
};

export default SearchedPlantCard;
