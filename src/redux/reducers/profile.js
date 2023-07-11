const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: '',
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    dataProfile: (state, action) => {
      state.data = action.payload;
    },
    removeProfile: () => {
      return initialState;
    },
  },
});

export const {dataProfile, removeProfile} = profile.actions;
export default profile.reducer;
