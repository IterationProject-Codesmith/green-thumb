import React from 'react';
import { selectUsername } from '../reducers/userSlice';
import { useSelector } from 'react-redux';

const SearchedPlantCard = (props) => {
  
const username = useSelector(selectUsername)

//useSelector 
//send info to database - username, plant info (common_name, cycle, watering, sunlight,image url)


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
            //have logic to see if its there, maybe change in state?
            <p></p>
          )}
        </div>
        <button onclick={addToFavorites} id="favorite">Add to favorites</button>
      </div>
    </>
  );
};

export default SearchedPlantCard;
