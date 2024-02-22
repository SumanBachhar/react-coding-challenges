import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Hello world" }],
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add todo
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    // Remove todo
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Update todo
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const taskIndex = state.todos.findIndex((todo) => todo.id === id);
      if (taskIndex !== -1) {
        state.todos[taskIndex].text = text;
      }
    },
  },
});

export const { addTodo, removeTodo, editTask } = todoSlice.actions;

export default todoSlice.reducer;
