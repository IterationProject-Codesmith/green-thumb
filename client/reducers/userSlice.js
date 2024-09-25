import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  isLoggedIn: false,
  favoritePlants: {},
  //add plant to users favorite platns
  favoriteSearch: '',
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
    //reducer to send to database
    addPlantToFavorites: (state, action) => {
      // if (state.isLoggedIn === true) {
        const plant = action.payload;
        state.favoritePlants[plant.common_name] = plant;
        // console.log(state)
        // console.log(state.user)
        // console.log(state.user.favoritePlants)
        // console.log(state.favoritePlants)
      // } else {
        // console.log(`user must be logged in to add a favorite plant`);
      // }
    },

    setFavoriteNote: (state, action) => {
      if (state.isLoggedIn === true) {
        const note = action.payload.note;
        const plantWithNote = action.payload.plantId;
        const userId = action.payload.userId;
        const favorites = state.favoritePlants;
        for(const favorite in favorites){

        }

        state.favoritePlants[plant.common_name]. = note;
      } else {
        console.log(`user must be logged in to add a favorite plant`);
      }
    }
  },
});

export const saveFavoritetoDatabase = createAsyncThunk(
  `database/favorites?`,
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
    const favorite = await details.json();
    return favorite;
  }
);
//async thunk = a func that accepts an action type string and a payload creator cb(like a fetch request), and returns a promise

export const saveNotetoDatabase = createAsyncThunk(
  'notes/createNote',
  async (note, userId) => {
    const response = await fetch('/plants/note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, note }),
    }
  )}
);

export const { addPlant, setUser, setLoggedIn, addPlantToFavorites } =
  userSlice.actions;
export const selectUsername = (state) => state.user.username;
export default userSlice.reducer;
