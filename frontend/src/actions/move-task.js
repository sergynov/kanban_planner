import { ACTION_TYPE } from "./action-types";

export const moveTask = (taskId, fromColumn, toColumn, toIndex) => ({
  type: ACTION_TYPE.MOVE_TASK,
  payload: { taskId, fromColumn, toColumn, toIndex }
});