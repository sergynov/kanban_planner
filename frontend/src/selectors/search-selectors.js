import { createSelector } from 'reselect';

//  Состояние доски
export const selectAllTasks = state => state.tasks.all || [];

// Поисковый запрос
export const selectSearchQuery = state => state.search.query || '';

// 7️⃣ Фильтрация задач по глобальному поиску
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectSearchQuery],
  (tasks, query) => {
    if (!tasks) return [];
    if (!query.trim()) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  }
);