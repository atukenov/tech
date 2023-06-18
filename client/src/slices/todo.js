import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import TodoService from "../services/todo.service";

export const findAll = createAsyncThunk(
  "todo/findAll",
  async (params, thunkAPI) => {
    try {
      const data = await TodoService.findAll(params);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const create = createAsyncThunk(
  "todo/create",
  async (body, thunkAPI) => {
    try {
      const data = await TodoService.create(body);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const update = createAsyncThunk(
  "todo/update",
  async (body, thunkAPI) => {
    try {
      const data = await TodoService.update(body);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: {
    [findAll.fulfilled]: (state, action) => {
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.todos = action.payload.todos;
    },
    [findAll.rejected]: (state, action) => {
      state = null;
    },
    [create.fulfilled]: (state, action) => {
      state.totalItems += 1;
      state.totalPages = Math.ceil(state.totalItems / 3);
    },
    [update.fulfilled]: (state, action) => {},
  },
});

const { reducer } = todoSlice;
export default reducer;
