import { ACTION_TYPE } from "../actions";
import { mergeTasks } from "../helpers/merge-task";

const initialState = {
  board: null,
  list: [],
  columns: [],
  tasks: [],
  search: '',
  loading: false,
  error: null
}

export const boardReducer = (state=initialState, action) => {
  switch(action.type){

    case ACTION_TYPE.SET_BOARD: {
      return {
        ...state,
        board: action.payload.board,
        columns: action.payload.columns,
        tasks: mergeTasks(state.tasks, action.payload.tasks),
        loading: false,
        error: null
      }
    }

    case ACTION_TYPE.SET_BOARDS:
      return {
        ...state,
        list: action.payload
      };

    case ACTION_TYPE.UPDATE_BOARD:
      return {
        ...state,
        board: action.payload,
        list: state.list.map(b =>
          b.id === action.payload.id ? action.payload : b
    )
  };

    case ACTION_TYPE.CLEAR_BOARD:
      return {
        ...state,
        board: null,
        columns: []
      }

    case ACTION_TYPE.ADD_BOARD:
      return {
        ...state, 
        list: [...(state.list || []), action.payload] 
      };
    
    case ACTION_TYPE.DELETE_BOARD:
      return {
        ...state,
        list: state.list.filter(board => board.id !== action.payload),
        board: null,
        columns: [],
        tasks: []
      }

    case ACTION_TYPE.ADD_COLUMN:
      return {
        ...state,
        columns: [...state.columns, action.payload]
      };

    case ACTION_TYPE.UPDATE_COLUMN:
      return {
        ...state,
        columns: state.columns.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    case ACTION_TYPE.DELETE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter(c => c.id !== action.payload),
        tasks: state.tasks.filter(t => t.columnId !== action.payload)
      };


    case ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTION_TYPE.SET_ERROR:
      return { ...state, error: action.payload };

    case ACTION_TYPE.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }

    

    case ACTION_TYPE.MOVE_COLUMN: {
      const { columnId, toIndex } = action.payload;
      const columns = [...state.columns];
      const fromIndex = columns.findIndex(c => c.id === columnId);

      // удаляем колонку с текущей позиции
      const [moved] = columns.splice(fromIndex, 1);
      // вставляем на новую позицию
      columns.splice(toIndex, 0, moved);

      // обновляем order локально
      const updatedColumns = columns.map((col, idx) => ({ ...col, order: idx }));

      return {
        ...state,
        columns: updatedColumns
      };
    }

    default:
      return state;
  }
}