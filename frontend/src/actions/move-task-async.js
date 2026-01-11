import { ACTION_TYPE } from "./action-types";
import { updateTaskAsync } from "./update-task-async";
import { moveTask } from "./move-task";


export const moveTaskAsync = ({ taskId, fromColumn, toColumn, toIndex }) => async (dispatch, getState) => {
  dispatch(moveTask(taskId, fromColumn, toColumn, toIndex));

  const { all: tasks } = getState().tasks; 

  // колонки которые нужно обновить
  const columnsToUpdate = [fromColumn, toColumn];

  const normalizeId = v => (typeof v === 'string' ? v : v?._id);

  for (const columnId of columnsToUpdate) {
    const columnTasks = tasks
      .filter(t => normalizeId(t.columnId) === normalizeId(columnId))
      .sort((a, b) => a.order - b.order);

    for (const task of columnTasks) {
      await dispatch(updateTaskAsync(task.id, {
        columnId: task.columnId,
        order: task.order
      }));
    }
  }
};