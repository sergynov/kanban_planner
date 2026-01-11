import { ACTION_TYPE } from "./action-types";
import { updateColumnAsync } from "./update-column-async";
import { moveColumn } from "./move-column";

export const moveColumnAsync = ({ columnId, toIndex }) => async (dispatch, getState) => {

    dispatch(moveColumn(columnId, toIndex ));

    const { columns } = getState().board;

    // Сортируем колонки по текущему order
    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

    sortedColumns.forEach((col, index) => {
      col.order = index;
    });

    // Сохраняем на сервер каждую колонку через updateColumnAsync
    for (const col of sortedColumns) {
      await dispatch(
        updateColumnAsync(col.id, { order: col.order })
      );
    }
  };