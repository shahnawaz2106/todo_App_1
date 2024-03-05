

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to get the current timestamp
const getCurrentTimestamp = () => new Date().toISOString();

// Async thunk to fetch todos from an API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  const todosWithTimestamps = response.data.map(todo => ({
    ...todo,
    created_at: getCurrentTimestamp(),
    updated_at: getCurrentTimestamp(),
}));
// {console.log(response.data)}
  return todosWithTimestamps;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(payload) {
        const timestamp = getCurrentTimestamp();
        return {
          payload: {
            ...payload,
            id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
            created_at: timestamp,
            updated_at: timestamp,
          },
        };
      },
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updated_at = getCurrentTimestamp(); // Update updated_at timestamp
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
