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
    setUsername: (state, action) => {
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
    addPlantToFavorites: (state, action) =>{
      if (state.isLoggedIn === true){
        const plant = action.payload;
        state.favoritePlants[plant.common_name] = plant;
      } else {
        console.log(`user must be logged in to add a favorite plant`)
      }
    }
  },
});
export const saveFavoritetoDatabase = createAsyncThunk(
  `database/favorites?`,
  async (plantandUserInfo) => {
    const details = await fetch(`database/favorites`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: plantandUserInfo.userId,
        common_name: plantandUserInfo.common_name,
        cycle: plantandUserInfo.cycle,
        watering: plantandUserInfo.watering,
        sunlight: plantandUserInfo.sunlight,
        image_url: plantandUserInfo.image_url
      }),
    });
     if (!details.ok) {
       throw new Error("Cannot add plant to favorites");
     }
     const favorite = details.json();
     return favorite;
  }

)
//async thunk = a func that accepts an action type string and a payload creator cb(like a fetch request), and returns a promise

export const { addPlant, setUsername, setLoggedIn, addPlantToFavorites } = userSlice.actions;
export const selectUsername = (state) => state.user.username;
export default userSlice.reducer;
