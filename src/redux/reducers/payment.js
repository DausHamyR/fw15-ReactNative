const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: '',
};

const payment = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    dataPayment: (state, action) => {
      state.data = action.payload;
    },
    removeDataPayment: () => {
      return initialState;
    },
  },
});

export const {dataPayment, removeDataPayment} = payment.actions;
export default payment.reducer;
