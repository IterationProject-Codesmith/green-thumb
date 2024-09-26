import React from "react";
import { setFavoriteNote, saveComment } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../reducers/userSlice";

const FavoritePlantCard = (props) => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      userId: username,
      comment: comment,
      id: id,
    };

    dispatch(setFavoriteNote({}));
    dispatch(saveComment({}));
    // console.log(plantandUserInfo)
  };

  return (
    <div className="favorite-plant-card">
      {props.default_image ? (
        <img src={props.default_image.small_url}></img>
      ) : (
        <img alt={props.common_name}></img>
      )}
      <div className="favorite-plant-card-content">
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
        ) : null}
        {props.comment ? (
          <p>
            <em>User notes: </em>
            {props.comment}
          </p>
        ) : null}
      </div>
      <input
        type="text"
        className="commentInput"
        onChange={(e) => dispatch(commentInputUpdateOnChange(e.target.value))}
      ></input>
      <button onClick={addComment} id="commentButton">
        Add custom notes
      </button>
    </div>
  );
};

export default FavoritePlantCard;
