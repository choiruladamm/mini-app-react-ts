import { Task, TaskState } from '@/types/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc', // Changed default to ascending
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<TaskState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<TaskState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setFilter,
  setSortBy,
  setSortOrder,
} = taskSlice.actions;

export default taskSlice.reducer;
