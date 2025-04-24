import { getAddress } from '../../services/apiGeocoding';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


export const fetchAddress = createAsyncThunk('user/fetchAddress', async function () {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  // 3) Then we return an object with the data that we are interested in
  return { position, address };

})



const initialState = {
  username: '',
  status: 'idle',
  address: '',
  position: {},
  phone: '',
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
    // update the address and position in the state
    updateAddress(state, action) {
      state.address = action.payload;
    },
    updatePosition(state, action) {
      state.position = action.payload;
    },
    updatePhoneNumber(state, action) {
      state.phone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('user/fetchAddress/pending', (state) => {
        state.status = 'loading'
      })
      .addCase('user/fetchAddress/fulfilled', (state, action) => {
        state.status = 'idle'
        state.position = action.payload.position
        state.address = action.payload.address
      })
      .addCase('user/fetchAddress/rejected', (state) => {
        state.status = 'error'
        state.error = 'There was a problem with your address. Make sure you have given us the right one.'
      })
  }
})

export const { updateName, updateAddress, updatePosition, updatePhoneNumber } = userSlice.actions;

export default userSlice.reducer;
