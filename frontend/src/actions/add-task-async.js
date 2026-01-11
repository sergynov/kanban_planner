import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { addTask } from "./add-task";

export const addTaskAsync = (columnId,title) => async (dispatch, getState) => {
  try {
    const { all: allTasks } = getState().tasks;  // из taskReducer
    const { board } = getState().board;          // текущая доска

    // все задачи в колонке
    const columnTasks = allTasks.filter(t => t.columnId === columnId);

    // вычисляем максимальный order
    const maxOrder = columnTasks.length
      ? Math.max(...columnTasks.map(t => t.order))
      : -1;

    const res = await request(`${URL}/columns/${columnId}/tasks`, 'POST', {
      title,
      order: maxOrder + 1
    });

    // добавляем boardId в payload
    const newTask = {
      ...res.data,
      boardId: board.id,
      columnId
    };

    dispatch(addTask(newTask));
  } catch (e) {
    throw new Error(e);
  }
}