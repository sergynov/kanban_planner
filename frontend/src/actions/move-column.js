import { ACTION_TYPE } from "./action-types";


export const moveColumn = (columnId, toIndex ) => ({
  type: ACTION_TYPE.MOVE_COLUMN,
  payload: { columnId, toIndex }
});