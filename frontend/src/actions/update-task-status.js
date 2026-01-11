import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { updateTask } from "./update-task";

export const updateTaskStatusAsync = (taskId,completed) => async (dispatch) => {
  try {
    const res = await request(`${URL}/tasks/${taskId}`, 'PATCH', {completed})
    dispatch(updateTask(res.data))
  } catch (e) {
    throw new Error(e);
  }
}