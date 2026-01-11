import { ACTION_TYPE } from "../actions";

const initialState = {
  all: [],
  loading: false,
  error: null
};

export const taskReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTION_TYPE.SET_ALL_TASKS:
      return {
        ...state,
        all: action.payload
      };

      case ACTION_TYPE.ADD_TASK:
      return {
        ...state,
        all: [...state.all, action.payload]
      };

    case ACTION_TYPE.UPDATE_TASK:
      return {
        ...state,
        all: state.all.map(t =>
      t.id === action.payload.id
        ? { ...t, ...action.payload }
        : t
        ),
      };

    case ACTION_TYPE.DELETE_TASK:
      return {
        ...state,
        all: state.all.filter(t => t.id !== action.payload)
      };

    case ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };

      
    case ACTION_TYPE.MOVE_TASK: {
      const { taskId, fromColumn, toColumn, toIndex } = action.payload;

      const tasks = [...state.all];
      const movedTask = tasks.find(t => t.id.toString() === taskId);
      if (!movedTask) return state;
      let withoutMoved = tasks.filter(t => t.id.toString() !== taskId);

      if (fromColumn === toColumn) {// если перемещение внутри одной колонки
        
        const columnTasks = withoutMoved
          .filter(t => t.columnId.toString() === toColumn)
          .sort((a, b) => a.order - b.order);

        columnTasks.splice(toIndex, 0, { ...movedTask, columnId: toColumn });

        const updatedColumnTasks = columnTasks.map((t, i) => ({ ...t, order: i }));

        // остальные задачи
        const rest = withoutMoved.filter(t => t.columnId.toString() !== toColumn);

        return {
          ...state,
          all: [...rest, ...updatedColumnTasks]
        };
      } else 
        {// если перемещение между колонками
        const sourceTasks = withoutMoved
          .filter(t => t.columnId.toString() === fromColumn)
          .sort((a, b) => a.order - b.order)
          .map((t, i) => ({ ...t, order: i }));

        const targetTasks = withoutMoved
          .filter(t => t.columnId.toString() === toColumn)
          .sort((a, b) => a.order - b.order);

        targetTasks.splice(toIndex, 0, { ...movedTask, columnId: toColumn });

        const updatedTarget = targetTasks.map((t, i) => ({ ...t, order: i }));

        const rest = withoutMoved.filter(
          t => t.columnId.toString() !== fromColumn && t.columnId.toString() !== toColumn
        );

        return {
          ...state,
          all: [...rest, ...sourceTasks, ...updatedTarget]
        };
      }
}
    default:
      return state;
  }
}

