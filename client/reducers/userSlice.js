import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  isLoggedIn: false,
  favoritePlants: {},
  //add plant to users favorite platns
  favoriteSearch: '',
  favoriteInput: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPlant: (state) => {},
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setLoggedIn: (state) => {
      if (state.isLoggedIn) {
        state.isLoggedIn = false;
      } else if (state.isLoggedIn) {
        state.isLoggedIn = true;
      }
    },
    commentInputUpdateOnChange: (state, action) => {
      state.favoriteInput = action.payload;
    },
    //reducer to send to database
    addPlantToFavorites: (state, action) => {
      // if (state.isLoggedIn === true) {
        const plant = action.payload;
        state.favoritePlants[plant.common_name] = plant;

      // } else {
      // console.log(`user must be logged in to add a favorite plant`);
      // }
    },

    setFavoriteNote: (state, action) => {
      // if (state.isLoggedIn === true) {
      const comment = action.payload.comment;
      const id = action.payload.plantId;
      const userId = action.payload.userId;
      const favorites = state.favoritePlants;
      for (const favorite in favorites) {
        if (favorite.id === id && favorite.userId === userId) {
          favorite.comment = comment;
        }
      }
      // } else {
      //   console.log(`user must be logged in to add a favorite plant`);
      // }
    },
  },
});

export const saveFavoritetoDatabase = createAsyncThunk(
  `database/favorites`,
  async (plantandUserInfo) => {
    const details = await fetch(`/api/plants`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        userId: plantandUserInfo.userId,
        id: plantandUserInfo.id,
        common_name: plantandUserInfo.common_name,
        cycle: plantandUserInfo.cycle,
        watering: plantandUserInfo.watering,
        sunlight: plantandUserInfo.sunlight,
        image_url: plantandUserInfo.image_url,
      }),
    });
    if (!details.ok) {
      throw new Error('Cannot add plant to favorites');
    }
    // const favorite = await details.json();
    console.log('success')
  }
);
//async thunk = a func that accepts an action type string and a payload creator cb(like a fetch request), and returns a promise

export const saveComment = createAsyncThunk(
  'notes/saveComment',
  async (id, userId, comment) => {
    const response = await fetch('/plants/note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        comment: comment,
        id: id,
      }),
    });
    if (!details.ok) {
      throw new Error(`Cannot add comment to favorite ${id}`);
    }
    const favoriteWithComment = await details.json();
    return favoriteWithComment;
  }
);

export const {
  addPlant,
  setUser,
  setLoggedIn,
  addPlantToFavorites,
  setFavoriteNote,
  commentInputUpdateOnChange,
} = userSlice.actions;
export const selectUsername = (state) => state.user.username;
export default userSlice.reducer;
