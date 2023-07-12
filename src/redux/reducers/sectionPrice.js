const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: '',
};

const section = createSlice({
  name: 'section',
  initialState,
  reducers: {
    sectionPrice: (state, action) => {
      state.data = action.payload;
    },
    removeSectionPrice: () => {
      return initialState;
    },
  },
});

export const {sectionPrice, removeSectionPrice} = section.actions;
export default section.reducer;
