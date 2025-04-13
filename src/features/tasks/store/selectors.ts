import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/stores';
import { Task } from '@/types/task';

export const selectTasks = (state: RootState) => state.tasks;
export const selectFilter = (state: RootState) => state.filter;
export const selectSortBy = (state: RootState) => state.sortBy;
export const selectSortOrder = (state: RootState) => state.sortOrder;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }
);

export const selectSortedTasks = createSelector(
  [selectFilteredTasks, selectSortBy, selectSortOrder],
  (filteredTasks, sortBy, sortOrder) => {
    const sortedTasks = [...filteredTasks].sort((a: Task, b: Task) => {
      let comparison = 0;

      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        }
        case 'dueDate': {
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        }
        default: {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sortedTasks;
  }
);

export const selectTasksCount = createSelector([selectTasks], (tasks) => ({
  total: tasks.length,
  active: tasks.filter((task) => !task.completed).length,
  completed: tasks.filter((task) => task.completed).length,
}));

export const selectOverdueTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !task.completed && dueDate < today;
  })
);
