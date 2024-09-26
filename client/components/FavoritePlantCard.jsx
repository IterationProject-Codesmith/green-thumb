import React from "react";
import { deleteFavorites, fetchFavorites } from "../reducers/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../reducers/userSlice";

const FavoritePlantCard = (props) => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  // const addComment = (e) => {
  //   e.preventDefault();
  //   const newComment = {
  //     userId: username,
  //     comment: comment,
  //     id: id,
  //   };

  //   dispatch(setFavoriteNote({}));
  //   dispatch(saveComment({}));
  //   // console.log(plantandUserInfo)
  // };

  const handleDelete = (e) => {
    e.preventDefault();
    const info = {
      username: username,
      plantId: props.plantId
    }
    console.log(`props: ${JSON.stringify(props)}`)
    console.log(info)
    dispatch(deleteFavorites(info))
    dispatch(fetchFavorites(username))
  }

  return (
    <div className="favorite-plant-card">
      {props.imageUrl ? (
        <img classname='plant-photo' src={props.imageUrl}></img>
      ) : (
        <img alt={props.common_name}></img>
      )}
      <div className="favorite-plant-card-content">
        <h3>{props.commonName}</h3>
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
        ) : null}
        {props.comment ? (
          <p>
            <em>User notes: </em>
            {props.comment}
          </p>
        ) : null}
      </div>
      <button id = 'deletebutton' onClick={handleDelete}>
        Remove from favorites
      </button>
    </div>
  );
};

export default FavoritePlantCard;
