import { createSelector } from 'reselect';

export const selectBoardState = state => state.board;
export const selectTaskState = state => state.tasks;


// Колонки и задачи текущей доски
export const selectColumns = createSelector(
  [selectBoardState],
  boardState => boardState.columns || []
);

export const selectBoardTasks = createSelector(
  [selectTaskState, selectBoardState],
  (taskState, boardState) => {
    const boardId = boardState.board?.id;
    if (!boardId) return [];

    return taskState.all.filter(
      task => task.boardId && task.boardId.toString() === boardId
    );
  }
);

// Сортировка колонок по order
export const selectSortedColumns = createSelector(
  [selectColumns],
  columns => [...columns].sort((a,b) => a.order - b.order)
);

// Группировка задач доски по колонкам
export const selectBoardTasksByColumn = createSelector(
  [selectBoardTasks],
  tasks => {
    const map = {};

    tasks.forEach(task => {
      const columnId = task.columnId;
      if (!map[columnId]) map[columnId] = [];
      map[columnId].push(task);
    });

    Object.values(map).forEach(arr =>
      arr.sort((a, b) => a.order - b.order)
    );

    return map;
  }
);