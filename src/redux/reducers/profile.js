const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  picture: '',
  username: '',
  email: '',
  phoneNumber: '',
  gender: '',
  profession: '',
  nationality: '',
  birthDate: '',
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.token = action.payload;
    },
    removeProfile: () => {
      return initialState;
    },
  },
});

export const {getProfile, removeProfile} = profile.actions;
export default profile.reducer;
