import {asyncLogin, asyncSignUp} from '../actions/auth';

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  token: null,
  errorMessage: '',
  successMessage: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncLogin.pending, state => {
      state.errorMessage = '';
      state.successMessage = '';
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(asyncSignUp.pending, state => {
      state.errorMessage = '';
      state.successMessage = '';
    });
    builder.addCase(asyncSignUp.fulfilled, (state, action) => {
      state.successMessage = action.payload;
      state.errorMessage = '';
    });
    builder.addCase(asyncSignUp.rejected, (state, action) => {
      state.successMessage = '';
      state.errorMessage = action.payload;
    });
  },
});

export const {login, logout} = auth.actions;
export default auth.reducer;
