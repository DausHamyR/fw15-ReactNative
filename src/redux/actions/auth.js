import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const asyncLogin = createAsyncThunk(
  'asyncLogin',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      form.append('email', payload.email);
      form.append('password', payload.password);

      const {data} = await http().post('/auth/login', form.toString());
      return data.results.token;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);

export const asyncSignUp = createAsyncThunk(
  'asyncSignUp',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      form.append('fullName', payload.fullName);
      form.append('email', payload.email);
      form.append('password', payload.password);
      form.append('confirmPassword', payload.confirmPassword);

      const {data} = await http().post('/auth/register', form.toString());
      if (data.success === true) {
        return data.message;
      }
    } catch (err) {
      const message = err.response.data.message;
      if (message) {
        return rejectWithValue(message);
      }
    }
  },
);
